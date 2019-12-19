using GestaoDeEstoque.Models;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeEstoque.Data
{
    public class ApplicationDatabaseContext : DbContext
    {
        public ApplicationDatabaseContext(DbContextOptions<ApplicationDatabaseContext> options) : base(options)
        {
        }

        public DbSet<Produto> Produtos { get; set; }

    }
}
