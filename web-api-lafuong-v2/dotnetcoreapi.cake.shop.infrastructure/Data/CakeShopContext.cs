using dotnetcoreapi.cake.shop.domain;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace dotnetcoreapi.cake.shop.infrastructure
{
    public class CakeShopContext : DbContext
    {
        public CakeShopContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasOne(oi => oi.Product)
                      .WithMany(p => p.OrderItems)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(oi => oi.Order)
                      .WithMany(o => o.Items)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(oi => new {oi.ProductId, oi.OrderId})
                      .IsUnique(true);
            });
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
    }
}
