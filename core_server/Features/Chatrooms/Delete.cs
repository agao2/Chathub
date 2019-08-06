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

            public async Task<Unit> Handle(DeleteCommand command, CancellationToken cancellationToken)
            {
                DeleteCommandValidator validator = new DeleteCommandValidator();
                var results = validator.Validate(command);

                // null or empty fields
                if (results.IsValid == false)
                    throw new RestException(HttpStatusCode.BadRequest, results.Errors);


                Chatroom chatroom = await _context.Chatrooms.FirstOrDefaultAsync(c => c.ChatroomId == command.Id);

                if (chatroom == null)
                    throw new RestException(HttpStatusCode.NotFound, "Chatroom not found");

                _context.Chatrooms.Remove(chatroom);
                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}
