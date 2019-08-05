using System;
using core_server.Domain;
using core_server.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using FluentValidation;
using core_server.Infrastructure.Errors;
using System.Net;
using MediatR;
using System.Threading;

namespace core_server.Features.Chatrooms
{
    public class Delete
    {
        public class DeleteCommand : IRequest
        {
            public int Id { get; set; }
        }

        public class DeleteCommandValidator : AbstractValidator<DeleteCommand>
        {
            public DeleteCommandValidator()
            {
                RuleFor(x => x.Id).NotNull().NotEmpty();
            }
        }

        public class Handler : IRequestHandler<DeleteCommand>
        {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(DeleteCommand command, CancellationToken cancellationToken)
            {
                DeleteCommandValidator validator = new DeleteCommandValidator();
                var results = validator.Validate(command);

                 // null or empty fields
                if (results.IsValid == false)
                {
                    throw new RestException(HttpStatusCode.BadRequest, results.Errors);
                }
            }
        }
    }
}
