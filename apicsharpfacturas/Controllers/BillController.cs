



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
                var bills = await this._context.bills.Include(x => x.details).ToListAsync();

                return Ok(bills);
            }
            catch (System.Exception ex)
            {
                return BadRequest("No se pudo traer la lista de facturas" + ex);
            }

        }

        // ============== get all bills from especifique client ==============
        [HttpGet("{clientId}")]
        public async Task<ActionResult<ICollection<BillEntity>>> GetBillByClientId([FromRoute] int clientId)
        {

            try
            {
                ICollection<BillEntity> bills = new List<BillEntity>();
                // find the cliente 
                var clientTemp = await this._context.clients.FindAsync(clientId);
                // check it is not null 
                if (clientTemp != null)
                {
                    bills = clientTemp.bills;
                }
                // return a list form a specifique client
                return Ok(bills);

            }
            catch (System.Exception ex)
            {
                return BadRequest("No se pudo obtener las facturas del client id: " + clientId + " . " + ex);
            }
        }

        // ============== create a new bill to a specifique client ==============
        [HttpPost("{clientId}")]
        public async Task<ActionResult<BillEntity>> createBill([FromBody] BillEntity billReq, [FromRoute] int clientId)
        {

            // list of details
            List<BillDetailEntity> detailList = new List<BillDetailEntity>();

            // instantiate a new bill
            BillEntity billTemp = new BillEntity();
            // find the client 
            var clientTemp = await this._context.clients.FindAsync(clientId);

            if (clientTemp == null)
            {
                return BadRequest("El cliente no existe en la base de datos. ");
            }

            if (billReq != null)
            {
                // map properties from request to entity
                billTemp.subTotal = billReq.subTotal;
                billTemp.discount = billReq.discount;
                billTemp.totalValue = billReq.totalValue;
                billTemp.client = clientTemp;



                /// loop through details of billReq
                foreach (var item in billReq?.details)
                {
                    //create new BillDetailsEntity instance
                    var detail = new BillDetailEntity();
                    // 


                    var currentProduct = await this._context.products.FindAsync(item.product?.id);
                    // map properties from request to the new instance
                    
                    detail.quantity = item.quantity;
                    detail.unitValue = item.unitValue;
                    detail.totalValue = item.totalValue;
                    detail.product = currentProduct;
                    detail.billEntity = billTemp;
                    this._context.billDetails.Add(detail);
                    
                   
                }

          

                this._context.bills.Add(billTemp);
                await this._context.SaveChangesAsync();
                // set client from request to new bill


                return Ok(billTemp);
            }
            else if (billReq == null)
            {
                return BadRequest("El objeto a guardar no es valido. Porfavor compruebe que los datos de factura sean valido. ");
            }
            else
            {
                return BadRequest("Error al crear la factura ");
            }
        }


    }
}