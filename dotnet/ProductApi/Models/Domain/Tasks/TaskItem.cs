namespace ProductApi.Models.Domain.Tasks
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string? Item { get; set; }

        public bool IsCompleted { get; set; }
    }
}
