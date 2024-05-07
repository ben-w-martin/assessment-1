using System.ComponentModel.DataAnnotations;

namespace ProductApi.Models.Request.Tasks
{
    public class TaskAddRequest
    {
        [Required]
        [StringLength(100, MinimumLength =1)]
        public string? Item { get; set; }
    }
}
