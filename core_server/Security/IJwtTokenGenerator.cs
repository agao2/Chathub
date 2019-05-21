using System.Threading.Tasks;

namespace core_server.Security
{
    public interface IJwtTokenGenerator
    {
        Task<string> CreateToken(string username);
    }
}