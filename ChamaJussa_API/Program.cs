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

// 1. Carregar Variáveis de Ambiente (.env)
Env.Load();
var builder = WebApplication.CreateBuilder(args);

// Garante que pega do .env ou tenta pegar do appsettings.json como fallback
string conexao = Environment.GetEnvironmentVariable("CONNECTION_STRING") 
    ?? builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? throw new InvalidOperationException("A Connection String não foi configurada.");

// 2. Controllers e CORS
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

// 3. Documentação Swagger com Autenticação JWT
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

// 4. Banco de Dados (DbContext)
builder.Services.AddDbContext<JussaCalls2Context>(opt => opt.UseSqlServer(conexao));

// 5. Injeção de Dependências (Repositórios e Serviços)
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IOSRepository, OSRepository>();
builder.Services.AddScoped<IStorageRepository, localStorageService>();

builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<OS_Service>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<GerarJWT>();

// 6. Configuração de Autenticação JWT
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

// -------------------------------------------------------------
// PIPELINE DE REQUISIÇÕES (A ORDEM AQUI É CRÍTICA)
// -------------------------------------------------------------

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

// ATENÇÃO: Autenticação SEMPRE ANTES da Autorização
app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();