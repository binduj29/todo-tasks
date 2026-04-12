using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        // Constructor injection of database context
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/todo
        // Fetch all todo tasks from database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        // POST: api/todo
        // Create a new todo task
        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodo(TodoItem todo)
        {

            if (todo.Text.Length <= 10 || todo.Text.Length > 70)
            {
                return BadRequest("Task must be between 10 and 70 characters");
            }

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return Ok(todo);
        }

        // PUT: api/todo/{id}
        // Update existing todo task by id
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, TodoItem updated)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null) return NotFound();

            todo.Text = updated.Text;
            todo.IsDone = updated.IsDone;
            todo.Deadline = updated.Deadline;

            await _context.SaveChangesAsync();

            return Ok(todo);
        }

        // DELETE: api/todo/{id}
        // Delete a todo task by id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null) return NotFound();

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}