using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend
{
    public class Application
    {
        public static WebApplicationBuilder Builder { get; private set; }
        public static WebApplication App { get; private set; }
        public static String Key { get; private set; }

        public static TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                ValidIssuer = Builder.Configuration["Jwt:Issuer"],
                ValidAudience = Builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key)),
            };
        }

        static Application()
        {
            Builder = WebApplication.CreateBuilder();

            DotNetEnv.Env.Load();
            var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
            var dbPort = Environment.GetEnvironmentVariable("DB_PORT");
            var dbName = Environment.GetEnvironmentVariable("DB_NAME");
            var dbUser = Environment.GetEnvironmentVariable("DB_USER");
            var dbPass = Environment.GetEnvironmentVariable("DB_PASS");

            Key = Environment.GetEnvironmentVariable("JWT_SECRET") ?? "defaultSecretKey";

            // Configure services
            Builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(
                    $"Host={dbHost};Port={dbPort};Database={dbName};Username={dbUser};Password={dbPass}"
                )
            );

            Builder
                .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.TokenValidationParameters = GetValidationParameters();
                });

            Builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("Role", policy => policy.RequireClaim("Role", "Admin"));
            });

            Builder.Services.AddControllers();
            // Builder.Services.AddTransient<Seed>();
            Builder.Services.AddEndpointsApiExplorer();
            Builder.Services.AddSwaggerGen();

            App = Builder.Build();

            if (App.Environment.IsDevelopment())
            {
                App.UseSwagger();
                App.UseSwaggerUI();
            }

            App.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            App.UseHttpsRedirection();
            App.UseAuthorization();
            App.MapControllers();
        }

        public void Run()
        {
            App.Run();
        }
    }
}
