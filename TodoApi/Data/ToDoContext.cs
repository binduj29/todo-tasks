using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data
{
    // Database context for Todo application
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        // Represents Todo table in database
        public DbSet<TodoItem> Todos => Set<TodoItem>();
    }
}