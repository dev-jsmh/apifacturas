
using Microsoft.EntityFrameworkCore;
using apicsharpfacturas.Models;
using Microsoft.AspNetCore.Builder;
using apicsharpfacturas;

var builder = WebApplication.CreateBuilder();

var startup = new Startup( builder.Configuration );

startup.ConfigureServices(builder.Services);

var app = builder.Build();

startup.Configure( app, builder.Environment);

  app.Run();

/*
var app = builder.Build();

// Add services to the container.

builder.Services.AddControllersWithViews();

// ther are mising options inside the addDdContext() method
builder.Services.AddDbContext<DbContext>(  );

var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
*/