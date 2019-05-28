using System;
using core_server.Domain;
using core_server.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using FluentValidation;
using core_server.Infrastructure.Errors;
using System.Net;

namespace core_server.Features.Users
{
    public class Create
    {

        private readonly ApplicationDbContext _context;
        public Create(ApplicationDbContext context)
        {
            _context = context;
        }

        public class UserData
        {
            public string Username { get; set; }

            public string EmailAddress { get; set; }

            public string Password { get; set; }
        }

        public class UserDataValidator : AbstractValidator<UserData>
        {
            public UserDataValidator()
            {
                RuleFor(x => x.Username).NotNull().NotEmpty();
                RuleFor(x => x.EmailAddress).NotNull().NotEmpty();
                RuleFor(x => x.Password).NotNull().NotEmpty();
            }
        }

        public async Task<UserData> Handle(UserData data)
        {
            UserDataValidator validator = new UserDataValidator();
            var results = validator.Validate(data);

            // null or empty fields
            if (results.IsValid == false)
            {
                throw new RestException(HttpStatusCode.BadRequest, results.Errors);
            }

            // duplicate user
            if (await _context.Users.Where(u => u.EmailAddress == data.EmailAddress).AnyAsync())
            {
                throw new RestException(HttpStatusCode.BadRequest, "Used email address");
            }

            await _context.Users.AddAsync(
                new User
                {
                    Username = data.Username,
                    EmailAddress = data.EmailAddress,
                    Password = data.Password,
                    DateCreated = DateTime.Now.ToString(),
                    PasswordSalt = "salt"  // TODO : add salting algorithm
                }
            );
            _context.SaveChanges();
            return data;

        }
    }
}