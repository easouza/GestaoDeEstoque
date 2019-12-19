﻿using System;
using GestaoDeEstoque.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GestaoDeEstoque.Data
{
    public static class DatabaseConfiguration
    {
        public static IServiceCollection AddDatabaseModule(this IServiceCollection @this, IConfiguration configuration)
        {
            var connection = configuration.GetConnectionString("SqliteConnectionString");
            @this.AddDbContext<ApplicationDatabaseContext>(context => { context.UseSqlite(connection); });
            return @this;
        }

        public static IApplicationBuilder UseApplicationDatabase(this IApplicationBuilder @this,
            IServiceProvider serviceProvider, IHostingEnvironment environment)
        {
            if (environment.IsDevelopment() || environment.IsProduction())
            {
                var context = serviceProvider.GetRequiredService<ApplicationDatabaseContext>();
                context.Database.OpenConnection();
                context.Database.EnsureCreated();
            }

            return @this;
        }
    }
}
