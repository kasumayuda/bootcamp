using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ExploreJogjaAPI.Model.User;
using ExploreJogjaAPI.Model.Event;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ExploreJogjaAPI
{
    public class ExploreJogjaAPIContext : DbContext//IdentityDbContext<UserEntity, UserRoleEntity, Guid>
    {
        public ExploreJogjaAPIContext(DbContextOptions options) : base(options) { }

        //public DbSet<UserEntity> Users { get; set; }

        //public DbSet<UserRoleEntity> UserRoles { get; set; }

        public DbSet<EventEntity> EventsList { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        //    optionsBuilder.UseNpgsql("Data Source=ExploreJogjaDB");
        //}

        protected override void OnModelCreating(ModelBuilder builder) {
            //builder.Entity<DataEventRecord>().HasKey(m => m.DataEventRecordId);
            //builder.Entity<SourceInfo>().HasKey(m => m.SourceInfoId);
            //builder.Entity<EventEntity>().HasKey(m => m.EventID);

            //// shadow properties
            //builder.Entity<DataEventRecord>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<SourceInfo>().Property<DateTime>("UpdatedTimestamp");

            base.OnModelCreating(builder);
        }

    }
}
