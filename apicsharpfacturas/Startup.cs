using apicsharpfacturas.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;



namespace apicsharpfacturas
{
    public class Startup
    {

        public IConfiguration Configuration { get; set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // configure services
        public void ConfigureServices(IServiceCollection services)
        {

            //var connectionString = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<DataContext>(options => options.UseMySql(Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version())));


            services.AddControllers().AddJsonOptions(x
            => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


            services.AddSwaggerGen(c =>
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "Billing Software",
                Description = "A small software to manage bill , products and clients."


            }));
        }

        public void Configure(WebApplication app, IWebHostEnvironment env)
        {
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940


            app.UseHttpsRedirection();
            app.UseStaticFiles();
            // make "Resources/Uploads/Images" folder servable so the client app ( angular ) can access its content
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), @"Resources")
                    ),
                RequestPath = new PathString("/api/v1/Resources") 
            });
            app.UseRouting();
            // swagger

            if (env.IsDevelopment())
            {
                app.UseSwagger(c =>
                {
                    c.SerializeAsV2 = true;
                });
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "api v1"));

            }

            app.MapControllers();

            //  app.Run();
            app.UseCors(x => x.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin()
            );
        }

    }
}

