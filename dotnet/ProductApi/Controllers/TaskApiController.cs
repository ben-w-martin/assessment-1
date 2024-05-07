using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductApi.Models.Domain.Products;
using ProductApi.Models.Domain.Tasks;
using ProductApi.Models.Request.Products;
using ProductApi.Models.Request.Tasks;
using ProductApi.Services;

namespace ProductApi.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskApiController : ControllerBase
    {
        TaskService _service;
        IConfiguration _config;

        public TaskApiController(IConfiguration config

           )
        {
            _config = config;

            _service = new TaskService(config);

        }


        [HttpGet]
        public IActionResult GetAllTasks()
        {

            List<TaskItem> tasks;

            try
            {
                tasks = _service.GetAll();

                if (tasks?.Count == 0)
                {

                    return StatusCode(404, "Resource not found");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


            return StatusCode(200, tasks);

        }

        [HttpPost]
        public IActionResult Create(TaskAddRequest model)
        {

            int id = 0;

            try
            {
                id = _service.Add(model);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return StatusCode(201, id);
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateById(TaskUpdateRequest model, int id)
        {
            model.Id = id;

            try
            {

            _service.Update(model);
            } catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return StatusCode(200);

        }

        [HttpDelete("{id:int}")]
        public void DeleteById(int id)
        {

            _service.Delete(id);
        }
    }
}
