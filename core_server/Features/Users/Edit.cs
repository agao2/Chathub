using Microsoft.EntityFrameworkCore;
using System.Linq;
using core_server.Domain;
using core_server.Infrastructure;
using System.Threading.Tasks;
using FluentValidation;
using core_server.Infrastructure.Errors;
using System.Net;
using MediatR;
using System.Threading;

namespace core_server.Features.Users
{

    public class Edit
    {
         public class EditData : IRequest<EditData>
        {
            public string Username { get; set; }

            public string EmailAddress { get; set; }

            public string Password { get; set; }
        }

        public class EditDataValidator : AbstractValidator<EditData>
        {
            public EditDataValidator()
            {
                RuleFor(x => x.Username).NotNull();
                RuleFor(x => x.EmailAddress).NotNull().NotEmpty();
                RuleFor(x => x.Password).NotNull();
            }
        }

        public class Handler : IRequestHandler<EditData,EditData>
        {
            private readonly ApplicationDbContext _context;
            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<EditData> Handle(EditData data, CancellationToken cancellationToken)
            {
                EditDataValidator validator = new EditDataValidator();
                var results = validator.Validate(data);

                if (results.IsValid == false)
                {
                    throw new RestException(HttpStatusCode.BadRequest, results.Errors);
                }

                User user = await _context.Users.Where(u => u.EmailAddress == data.EmailAddress).SingleOrDefaultAsync();
                
                // not found
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, "User with email address not found");

                user.Username = data.Username ?? user.Username;
                user.Password = data.Password ?? user.Password;

                await _context.SaveChangesAsync(cancellationToken);

                return data;
            }
        }

    }
}