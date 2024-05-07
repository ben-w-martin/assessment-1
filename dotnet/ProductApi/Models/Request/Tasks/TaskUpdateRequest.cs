using System.ComponentModel.DataAnnotations;

namespace ProductApi.Models.Request.Tasks
{
    public class TaskUpdateRequest : TaskAddRequest
    {
        [Required]
        [Range(0, int.MaxValue)]
        public int Id { get; set; }

        public bool IsCompleted { get; set; }
    }
}
