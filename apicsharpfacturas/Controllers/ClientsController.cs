using apicsharpfacturas.Data;
using apicsharpfacturas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;


namespace apicsharpfacturas.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
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
                var clientTemp = await this._context.clients.FindAsync(id);
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

    }
}

