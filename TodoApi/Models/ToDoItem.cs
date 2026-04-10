namespace TodoApi.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Text { get; set; } = "";
        public DateTime? Deadline { get; set; }
        public bool IsDone { get; set; }
    }
}