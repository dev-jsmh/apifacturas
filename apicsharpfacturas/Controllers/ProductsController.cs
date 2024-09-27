
using System;
using System.Net.Http.Headers;
using apicsharpfacturas.Data;
using apicsharpfacturas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;



namespace apicsharpfacturas.Controllers
{
	[ApiController]
	[Route("api/products")]
	public class ProductsController : ControllerBase
	{

		public readonly DataContext _context;
		// inject the DdContext as a dependency

		public ProductsController(DataContext context)
		{
			_context = context;
		}

		// ------------- get all products -------------
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ProductEntity>>> GetProduct()
		{
			var products = await this._context.products.ToListAsync();
			return Ok(products);
		}
		// ------------- get product by id -------------
		[HttpGet("{id}")]
		public async Task<ActionResult<ProductEntity>> GetProductById([FromRoute] int id)
		{

			if (id == 0)
			{
				return BadRequest("El id no puede ser igual a cero.");
			}
			// find product on data base
			var productTemp = await this._context.products.FindAsync(id);
			// checke if found object isn't null 
			if (productTemp != null)
			{
				// return result 
				return Ok(productTemp);

			}
			else
			{ // send bad request messaje
				return BadRequest("El producto con id " + id + " no fue encontrado");
			}

		}

		// ------------- post product -------------
		[HttpPost]
		public async Task<ActionResult<ProductEntity>> SaveProduct([FromForm] ProductRequest productReq)
		{
			if (productReq == null)
			{
				return BadRequest("El objeto recibido es nulo");
			}

			var file = Request.Form.Files[0];

			// create instance for a new product
			var newProduct = new ProductEntity();
			// map properties from request to product
			newProduct.name = productReq.name;
			newProduct.model = productReq.model;
			newProduct.price = productReq.price;
			newProduct.stock = productReq.stock;

			/// process image file from request
			
			var folderName = Path.Combine("Resources", "Uploads", "Images");
			var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
			// check if the file has a length
			if (file.Length > 0)
			{
				var imageName = ContentDispositionHeaderValue.Parse( file.ContentDisposition).FileName.Trim('"');
				var fullPath = Path.Combine(pathToSave, imageName);
				var dbPath = Path.Combine(folderName, imageName);

				using (var stream = new FileStream(fullPath, FileMode.Create))
				{
					file.CopyTo(stream);

				}
				// set image url 
				newProduct.imagePath = dbPath;
			}

			// save product data in data base
			this._context.products.Add(newProduct);
			await this._context.SaveChangesAsync();
			return Ok(newProduct);

		}
		// ------------- put product -------------
		[HttpPut("{id}")]
		public async Task<ActionResult<ProductEntity>> UpdateProduct([FromRoute] int id, [FromForm] ProductRequest productReq)
		{
			// validates if product exists
			if (id == 0)
			{
				return BadRequest("El id no puede ser igual a cero.");
			}

				// product taken from database
			var productTemp = await this._context.products.FindAsync(id);

			if (productTemp != null)
			{

				// map properties from request to entity 
				productTemp.name = productReq.name;
				productTemp.model = productReq.model;
				productTemp.price = productReq.price;
				productTemp.stock = productReq.stock;

				// save image if exits in the request
				var folderPath = Path.Combine("Resources", "Uploads", "Images");
				var pathToSave = Path.Combine( Directory.GetCurrentDirectory(), folderPath );

               
				/// check if there exists a file in the request
                if (Request.Form.Files.Count > 0)
                {
                    // image file
                    var formFile = Request.Form.Files[0];
					IFormFile imageFile = formFile;

                    if (imageFile.Length > 0)
                    {
                        var imageName = ContentDispositionHeaderValue.Parse(imageFile.ContentDisposition).FileName.Trim('"');
                        var fullPath = Path.Combine(pathToSave, imageName);
                        var dbPath = Path.Combine(folderPath, imageName);

                        // 
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            // copy the upload file to the specified folder location with create mode
                            imageFile.CopyTo(stream);
                        }
                        // set the new image path to product.imagePath property
                        productTemp.imagePath = dbPath;

                    }
                }


                // save entity on data base 
                this._context.Entry(productTemp).State = EntityState.Modified;
				await this._context.SaveChangesAsync();
				// return result 
				return Ok(productTemp);

			}
			else
			{
				return BadRequest("El producto con id " + id + " no fue encontrado");
			}
		}

		// ------------- Delete product -------------
		[HttpDelete("{id}")]
		public async Task<ActionResult<ProductEntity>> DeleteProduct([FromRoute] int id)
		{

			if (id == 0)
			{
				return BadRequest("El id no puede es 0");
			}

			var productTemp = await this._context.products.FindAsync(id);

			if (productTemp != null)
			{
				this._context.products.Remove(productTemp);
				return Ok("El producto id: " + id + " se ha eliminado correctamente.");
			}
			else
			{
				return BadRequest("El producto con id " + id + " no se encuentra en la base de datos");
			}

		}

	}

}


