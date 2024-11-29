using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace backend
{

  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {


    [HttpPost("signup")]
    public async Task<IActionResult> Signup(SignupRequest request)
    {
    }

    private string GenerateJwtToken(User user)
    {
    }

  }
}
