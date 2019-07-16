using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using core_server.Domain;
using core_server.Infrastructure;
using core_server.Infrastructure.Security;
using core_server.Infrastructure.Errors;
using FluentValidation;
using System.Net;
using MediatR;

namespace core_server.Features.Users
{
    public class Login
    {
        public class LoginData : IRequest<AuthenticatedUser>
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

        public class Handler : IRequestHandler<LoginData, AuthenticatedUser>
        {
            private readonly ApplicationDbContext _context;
            private readonly IJwtTokenGenerator _jwtTokenGenerator;

            public Handler(ApplicationDbContext context, IJwtTokenGenerator JwtTokenGenerator)
            {
                _context = context;
                _jwtTokenGenerator = JwtTokenGenerator;
            }

            public async Task<AuthenticatedUser> Handle(LoginData message, CancellationToken cancellationToken)
            {
                LoginDataValidator validator = new LoginDataValidator();
                var results = validator.Validate(message);

                // null or empty fields
                if (results.IsValid == false)
                    throw new RestException(HttpStatusCode.BadRequest, results.Errors);

                User user = await _context.Users.Where(u => u.EmailAddress == message.EmailAddress).SingleOrDefaultAsync();

                // not found
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, "User with email address not found");

                // wrong password
                if (!user.Password.Equals(message.Password))
                    throw new RestException(HttpStatusCode.Forbidden, "Password or email does not match");

                return new AuthenticatedUser
                {
                    Token = await _jwtTokenGenerator.CreateToken(user.EmailAddress),
                    Username = user.Username
                };
            }
        }
    }
}