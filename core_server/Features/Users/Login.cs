using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using core_server.Domain;
using StackExchange.Redis;
using Microsoft.AspNetCore.Http;
using core_server.Infrastructure;
using core_server.Infrastructure.Security;
using core_server.Infrastructure.Errors;
using FluentValidation;
using System.Net;

namespace core_server.Features.Users
{
    public class Login
    {
        private readonly ApplicationDbContext _context;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public Login(ApplicationDbContext context, IJwtTokenGenerator JwtTokenGenerator)
        {
            _context = context;
            _jwtTokenGenerator = JwtTokenGenerator;
        }

        public class LoginData
        {
            public string EmailAddress { get; set; }

            public string Password { get; set; }
        }

        public class AuthenticatedUser
        {
            public string Token { get; set; }

            public string Username { get; set; }
        }

        public class LoginDataValidator : AbstractValidator<LoginData>
        {
            public LoginDataValidator()
            {
                RuleFor(x => x.EmailAddress).NotNull().NotEmpty();
                RuleFor(x => x.Password).NotNull().NotEmpty();
            }
        }

        public async Task<AuthenticatedUser> handle(LoginData data)
        {
            LoginDataValidator validator = new LoginDataValidator();
            var results = validator.Validate(data);

            // null or empty fields
            if (results.IsValid == false)
                throw new RestException(HttpStatusCode.BadRequest, results.Errors);


            User user = await _context.Users.Where(u => u.EmailAddress == data.EmailAddress).SingleOrDefaultAsync();

            // not found
            if (user == null)
                throw new RestException(HttpStatusCode.NotFound, "User with email address not found");


            if (!user.Password.Equals(data.Password))
                throw new RestException(HttpStatusCode.Forbidden, "Password or email does not match");

            return new AuthenticatedUser
            {
                Token = await _jwtTokenGenerator.CreateToken(user.EmailAddress),
                Username = user.Username
            };
        }
    }
}