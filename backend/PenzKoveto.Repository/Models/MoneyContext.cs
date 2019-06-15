using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PenzKoveto.Repository.Models;

namespace PenzKoveto.Repository
{
    public class MoneyContext : IdentityDbContext
    {
        public MoneyContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Item> Items { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}