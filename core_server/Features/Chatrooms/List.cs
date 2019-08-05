using System;
using core_server.Domain;
using core_server.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using MediatR;
using System.Collections.Generic;
using System.Threading;

namespace core_server.Features.Chatrooms
{

    public class List
    {

        public class Query : IRequest<IEnumerable<Chatroom>>
        {
            public string Name { get; set; }
        }

        public class QueryHandler : IRequestHandler<Query, IEnumerable<Chatroom>>
        {
            private readonly ApplicationDbContext _context;
            public QueryHandler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Chatroom>> Handle(Query query, CancellationToken cancellationToken)
            {

                if (!string.IsNullOrWhiteSpace(query.Name))
                {
                    return await _context.Chatrooms.Where(c => c.Name.Contains(query.Name)).ToListAsync();
                }
                else
                {
                    return await _context.Chatrooms.ToListAsync();
                }
            }
        }
    }

}