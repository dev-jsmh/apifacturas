
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
			try
			{
				// get all products where property "isDeleted" equals to false
                var products = await this._context.products.Where(x => x.isDeleted == false).ToListAsync();
				// convert the request to an array and return it with an ok response
                return Ok(products);
            }// catch error or exeptions if there are produce
			catch ( Exception ex)
			{
				// return a error message when the request fails
				return BadRequest( ex );
			}
			
		}
		// ------------- get product by id -------------
		[HttpGet("{id}")]
		public async Task<ActionResult<ProductEntity>> GetProductById([FromRoute] int id)
		{

			if (id == 0)
			{
				return BadRequest("El id no puede ser igual a cero.");
			}
			try
			{
                // find product on data base
                var productTemp = await this._context.products.FindAsync(id);
                // checke if found object isn't null and has not been disable
                if (productTemp != null && productTemp.isDeleted == false)
                {
                    // return result 
                    return Ok(productTemp);
                }
                else
                { // send bad request messaje
                    return NotFound(new { error = "El producto con id " + id + " no fue encontrado", });
                }
			}
			catch ( Exception ex ) {
				return BadRequest(ex);
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

			// create instance for a new product
			var newProduct = new ProductEntity();
			// map properties from request to product
			newProduct.name = productReq.name;
			newProduct.model = productReq.model;
			newProduct.price = productReq.price;
			newProduct.stock = productReq.stock;
			// set this variable to false to say that we are creating and new product
			newProduct.isDeleted = false;

            // check if there exists a file in the request
            if ( Request.Form.Files.Count > 0) {

                // takes the files array from the body of the form
                // and extract the image of the product
                var imageFile = Request.Form.Files[0];

                var folderName = Path.Combine("Resources", "Uploads", "Images");
				var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
        
				var imageName = ContentDispositionHeaderValue.Parse(imageFile.ContentDisposition).FileName.Trim('"');
				var fullPath = Path.Combine(pathToSave, imageName);
				var dbPath = Path.Combine(folderName, imageName);

				using (var stream = new FileStream(fullPath, FileMode.Create))
				{
                    imageFile.CopyTo(stream);

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

			if (productTemp != null && productTemp.isDeleted == false )
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
			// validates if the id number is different of zero
			if (id == 0)
			{
				return BadRequest("El id no puede es 0");
			}
			try
			{
				// tries to get the product from database by its id
                var productTemp = await this._context.products.FindAsync(id);
				// return null if it is not found
                if (productTemp != null)
                {
					// disable the product on database
                    productTemp.isDeleted = true;
                    // change the state of the product to "modify"
                    this._context.products.Entry(productTemp).State = EntityState.Modified;
					// save made changes
					await this._context.SaveChangesAsync();
					// return result 
                    return Ok( 
						new
						{
						message = "El producto id: " + id + " se ha deshabilitado correctamente."
						});
                }
                else
                {
                    return BadRequest(
						new {
                        message = "El producto con id " + id + " no se encuentra en la base de datos"
						});
                }
            }
            catch(Exception ex)
			{
				return BadRequest( ex );
			}
		

		}

	}

}


