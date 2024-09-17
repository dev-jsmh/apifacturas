



using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using apicsharpfacturas.Data;
using apicsharpfacturas.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using apicsharpfacturas.Migrations;

namespace apicsharpfacturas.Controllers
{

    [ApiController]
    [Route("api/bills")]
    public class BillController : ControllerBase
    {

        public DataContext _context;
        // inject dependencies
        public BillController(DataContext context)
        {
            this._context = context;
        }

        // ============== get all bills from all clients ==============
        [HttpGet()]
        public async Task<ActionResult<IEnumerator<BillEntity>>> GetAll()
        {

            try
            {
                var bills = await this._context.bills
                    .Include( x => x.client)
                    .Include(x => x.details)
                    .ThenInclude( x => x.product ).ToListAsync();

                return Ok(bills);
            }
            catch (System.Exception ex)
            {
                return BadRequest("No se pudo traer la lista de facturas" + ex);
            }

        }

        // ============== get bill by id ==============
        [HttpGet("{billId}")]
        public async Task<ActionResult<BillEntity>> GetBillByClientId([FromRoute] int billId)
        {
            if( billId == 0 ) {
                return BadRequest("El id de factura no puede ser igual a cero ( 0 ).");
            }

            try
            {
                // look for the bill by its id 
                var billTemp = await this._context.bills
                    .Include(b => b.client)
                    .Include(b => b.details)
                    .ThenInclude( d => d.product)
                    .Where(b => b.id == billId)
                    .FirstOrDefaultAsync();
                // validate if the bill was found
                if (billTemp != null ) {
                    return Ok(billTemp);
                }
                else
                {
                    return BadRequest("La factura con id: " + billId + " no se ha encontrado.");
                }
            }
            catch (System.Exception ex)
            {
                return BadRequest("No se pudo obtener las facturas id: " + billId + " . " + ex);
            }
        }

    }
}