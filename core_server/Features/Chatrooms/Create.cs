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
    public class Create
    {
        public class ChatroomData : IRequest<ChatroomData>
        {
            public string Name { get; set; }

        }

        public class ChatroomDataValidator : AbstractValidator<ChatroomData>
        {
            public ChatroomDataValidator()
            {
                RuleFor(x => x.Name).NotNull().NotEmpty();
            }
        }

        public class Handler : IRequestHandler<ChatroomData, ChatroomData>
        {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<ChatroomData> Handle(ChatroomData chatroom, CancellationToken cancellation)
            {
                ChatroomDataValidator validator = new ChatroomDataValidator();
                var results = validator.Validate(chatroom);

                // null or empty fields
                if (results.IsValid == false)
                {
                    throw new RestException(HttpStatusCode.BadRequest, results.Errors);
                }

                await _context.Chatrooms.AddAsync(
                    new Chatroom { Name = chatroom.Name }
                );

                //TODO: add the user to the chatroom memberships table as well 
                // the logged in user that is creating the chatroom
                _context.SaveChanges();
                return chatroom;
            }
        }

    }
}