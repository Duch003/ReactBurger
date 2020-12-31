using BurgerBuilder.DTOs.Classes;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace BurgerBuilder.DataAccess
{
    public class BurgerBuilderContext : IdentityDbContext
    {
        public BurgerBuilderContext(DbContextOptions<BurgerBuilderContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            //var configuration = new ConfigurationBuilder()
            //    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            //    .AddJsonFile("appsettings.json")
            //    .Build();
            //optionsBuilder.UseSqlServer(configuration.GetConnectionString("BurgerBuilder"));
            ////optionsBuilder.UseInMemoryDatabase("x");
            //optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Customer>().HasKey(x => x.ID);
            modelBuilder.Entity<Customer>().HasOne(x => x.Address);

            modelBuilder.Entity<Ingridients>().HasKey(x => x.ID);

            modelBuilder.Entity<Address>().HasKey(x => x.ID);

            modelBuilder.Entity<Order>().HasKey(x => x.ID);
            modelBuilder.Entity<Order>().HasOne(x => x.Ingridients);
            modelBuilder.Entity<Order>().HasOne(x => x.Customer);
        }

        public DbSet<Ingridients> Ingridients { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
