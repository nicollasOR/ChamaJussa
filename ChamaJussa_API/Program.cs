using System.Text;
using ChamaJussa_API.Applications.Auth;
using ChamaJussa_API.Applications.Services;
using ChamaJussa_API.Contexts;
using ChamaJussa_API.Interface;
using ChamaJussa_API.Repository;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

Env.Load();
var builder = WebApplication.CreateBuilder(args);

string conexao = Environment.GetEnvironmentVariable("CONNECTION_STRING");
    //?? builder.Configuration.GetConnectionString("DefaultConnection");


builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Insira o token JWT desta forma: Bearer {seu_token}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddDbContext<JussaCalls2Context>(opt => opt.UseSqlServer(conexao));

builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IOSRepository, OSRepository>();
builder.Services.AddScoped<IStorageRepository, localStorageService>();

builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<OS_Service>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<GerarJWT>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var chave = builder.Configuration["Jwt:Key"] 
            ?? Environment.GetEnvironmentVariable("JWT_KEY") 
            ?? "SuaChaveSuperSecretaECompridaDeTeste123!";
        var issuer = builder.Configuration["Jwt:Issuer"] ?? "ChamaJussaAPI";
        var audience = builder.Configuration["Jwt:Audience"] ?? "ChamaJussaApp";

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chave))
        };
    });

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

// Autenticacao SEMPRE ANTES da Autorizacao
app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();