using Microsoft.EntityFrameworkCore;

namespace AElemental.FormBuilder.Code
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<FormField> FormFields { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<FormField>().HasData(new FormField()
            {
                FormFieldID = 1,
                Section = "Basic info",
                Field = "Name",
                Extension = "NAME",
                MaxLength = 100,
                Mandatory = true,
                FieldType = "Text"
            },
            new FormField()
            {
                FormFieldID = 2,
                Section = "Basic info",
                Field = "Description",
                Extension = "DESC",
                MaxLength = 400,
                FieldType = "Text"
            },
            new FormField()
            {
                FormFieldID = 3,
                Section = "Basic info",
                Field = "Creation Date",
                Extension = "DT",
                Mandatory = true,
                FieldType = "Date"
            },
            new FormField()
            {
                FormFieldID = 4,
                Section = "Price",
                Field = "Price",
                Extension = "AMT",
                Mandatory = true,
                FieldType = "Money"
            });

        }
    }
}