using apicsharpfacturas.Data;
using apicsharpfacturas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;


namespace apicsharpfacturas.Controllers
{

    [ApiController]
    [Route("api/clients")]
    public class ClientsController : ControllerBase
    {
        // add datacontext property
        public DataContext _context;
        // inject as a dependency
        public ClientsController(DataContext context)
        {
            this._context = context;
        }
        // ------------- get all clients -------------
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientEntity>>> GetAll()
        {

            try
            {
                var clients = await this._context.clients.ToListAsync();


                return Ok(clients);
            }
            catch (System.Exception)
            {

                return BadRequest("se produjo un error al traer los clients.");
            }
        }
        // ------------- get client by id -------------
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientEntity>> GetById(int id)
        {
            if (id == 0)
            {
                return BadRequest("El id no puede ser 0");
            }
            // 
            try
            {
                var clientTemp =  await this._context.clients
                    .Include(c => c.bills)
                    .ThenInclude(b => b.details)
                    .ThenInclude(d => d.product)
                    .Where(c => c.id == id).FirstOrDefaultAsync();

                // validates if the object is not null
                if (clientTemp != null)
                {
                    return Ok(clientTemp);
                }
                else
                {
                    return BadRequest("El cliente con id " + id + " no existe.");
                }
            }
            catch (System.Exception ex)
            {
                return BadRequest("se produjo un error al obtener el cliente: " + ex);
            }

        }
        // ------------- post client -------------
        [HttpPost]
        public async Task<ActionResult<ClientEntity>> PostClient([FromBody] ClientEntity clientReq)
        {

            if (clientReq != null)
            {
                this._context.clients.Add(clientReq);
                await this._context.SaveChangesAsync();
                return Ok(clientReq);
            }
            else
            {
                return BadRequest("El objeto enviado es nullo");
            }


        }
        // ------------- put client -------------
        [HttpPut("{id}")]
        public async Task<ActionResult<ClientEntity>> UpdateClient([FromRoute] int id, [FromBody] ClientEntity clientReq)
        {
            // validates if id is not equal to 0
            if (id == 0)
            {
                return BadRequest("El id " + " no puede ser cero.");
            }
            // find the client on the database
            var clientTemp = await this._context.clients.FindAsync(id);

            // map the properties from req to clientTemp 
            if (clientTemp != null)
            {
                clientTemp.names = clientReq.names;
                clientTemp.lastnames = clientReq.lastnames;
                // save on data base
                this._context.Entry(clientTemp).State = EntityState.Modified;
                await this._context.SaveChangesAsync();
                return Ok(clientTemp);
            }
            else
            {
                return BadRequest("Los datos del cliente no pudieron ser modificado. ");
            }

        }
        // ------------- delete client -------------
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClientEntity>> DeleteClient([FromRoute] int id)
        {
            var clientTemp = await this._context.clients.FindAsync(id);

            if (clientTemp != null)
            {
                this._context.clients.Remove(clientTemp);
                await this._context.SaveChangesAsync();
                return Ok("El client id " + id + " fue eliminado correctamente.");
            }
            else
            {
                return BadRequest("No se pudo eliminar el cliente id " + id);
            }


        }

        // ============== create a new bill to a specifique client ==============
        [HttpPost("{clientId}/bills")]
        public async Task<ActionResult<BillEntity>> createBill([FromBody] BillEntity billReq, [FromRoute] int clientId)
        {
            
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
                billTemp.date = billReq.date;

                this._context.bills.Add(billTemp);

                /// loop through details of billReq
                foreach (var item in billReq.details)
                {
                    //create new BillDetailsEntity instance
                    var detail = new BillDetailEntity();
                    // 
                    // get client from database
                    var currentProduct = await this._context.products.FindAsync(item.product.id);
                    // map properties from request to the new instance

                    detail.quantity = item.quantity;
                    detail.unitValue = item.unitValue;
                    detail.totalValue = item.totalValue;
                    detail.product = currentProduct;
                    detail.billEntity = billTemp;
                    this._context.billDetails.Add(detail);
                }
                await this._context.SaveChangesAsync();
                // return the entire bill if everthing is correct
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

        // ============== get all bills from especifique client ==============
        [HttpGet("{clientId}/bills")]
        public async Task<ActionResult<ClientEntity>> GetBillByClientId([FromRoute] int clientId)
        {
            try
            {
                // return a client with all related bills
                var clientBills = await this._context.clients
                    .Include(c => c.bills) 
                    .ThenInclude( bill => bill.details )
                    .ThenInclude( detail => detail.product )
                    .Where(c => c.id == clientId).FirstOrDefaultAsync();

                return Ok(clientBills);
            }
            catch (System.Exception ex)
            {
                return BadRequest("No se pudo obtener las facturas del client id: " + clientId + " . " + ex);
            }
        }



    }
}

