﻿
using System;
using apicsharpfacturas.Data;
using apicsharpfacturas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;



namespace apicsharpfacturas.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
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
		public async Task<ActionResult<ProductEntity>> SaveProduct([FromBody] ProductEntity newProduct)
		{
			if (newProduct == null)
			{
				return BadRequest("El objeto recibido es nulo");
			}
			else
			{
				this._context.products.Add(newProduct);
				await this._context.SaveChangesAsync();
				return Ok(newProduct);

			};

		}
		// ------------- put product -------------
		[HttpPut("{id}")]
		public async Task<ActionResult<ProductEntity>> UpdateProduct([FromRoute] int id, [FromBody] ProductEntity productReq)
		{
			// validates if product exists
			if (id == 0)
			{
				return BadRequest("El id no puede ser igual a cero.");
			}

			var productTemp = await this._context.products.FindAsync(id);

			if (productTemp != null)
			{

				// map properties from request to entity 
				productTemp.name = productReq.name;
				productTemp.model = productReq.model;
				productTemp.price = productReq.price;
			//	productTemp.stock = productReq.stock;

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
