using Microsoft.AspNetCore.Mvc;
using SalesReport.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SalesReport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesOrderDetailController : ControllerBase
    {
        private readonly ISalesOrderDetailRepository _salesOrderDetailRepository;
        public SalesOrderDetailController(ISalesOrderDetailRepository salesOrderDetailRepository)
        {
            _salesOrderDetailRepository = salesOrderDetailRepository;
        }

        // GET: api/<SalesOrderDetailController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SalesOrderDetailController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("GetByProductId/{productId}")]
        public IActionResult GetByProductId(int productId)
        {
            var salesOrderDetails = _salesOrderDetailRepository.GetByProductId(productId);
            if (salesOrderDetails == null)
            {
                return NotFound();
            }

            return Ok(salesOrderDetails);
        }

        // POST api/<SalesOrderDetailController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SalesOrderDetailController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SalesOrderDetailController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
