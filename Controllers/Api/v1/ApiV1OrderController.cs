﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webspec3.Controllers.Api.v1.Requests;
using webspec3.Controllers.Api.v1.Responses;
using webspec3.Entities;
using webspec3.Extensions;
using webspec3.Filters;
using webspec3.Services;

namespace webspec3.Controllers.Api.v1
{
	/// <summary>
	/// 
	/// Controller providing api access to orders
	///
	/// J. Mauthe
	/// </summary>
	[Route("api/v1/orders")]
	public class ApiV1OrderController : Controller
	{
		private readonly IProductService productService;
		private readonly ILoginService loginService;
		private readonly IOrderService orderService;

		private readonly ILogger logger;

		public ApiV1OrderController(IProductService productService, ILogger<ApiV1OrderController> logger,
			ILoginService loginService, IOrderService orderService)
		{
			this.productService = productService;
			this.logger = logger;
			this.loginService = loginService;
			this.orderService = orderService;
		}

		/// <summary>
		/// Creates a new Order
		/// </summary>
		/// <param name="model">Order to create</param>
		/// <response code="200">Order created successfully</response>
		/// <response code="400">Invalid model</response>
		/// <response code="403">No permissions to create new orders</response>
		/// <response code="500">An internal error occurred</response>
		/// <returns></returns>
		[HttpPost]
		[AdminRightsRequired]
		[LoginRequired]
		[ProducesResponseType(typeof(ApiV1OrderResponseModel), 200)]
		[ProducesResponseType(typeof(ApiV1ErrorResponseModel), 400)]
		[ProducesResponseType(403)]
		[ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
		public async Task<IActionResult> CreateNew([FromBody] ApiV1OrderCreateRequestModel model)
		{
			if (model != null && ModelState.IsValid)
			{
				var userId = loginService.GetLoggedInUserId();

				var orderEntity = new OrderEntity
				{
					CurrencyId = model.CurrencyId,
					Id = Guid.NewGuid(),
					UserId = userId
				};

				var orderProductList = new List<OrderProductEntity>();
				var totalPrice = decimal.Zero;

				foreach (var keyValuePair in model.ProductList)
				{
					if (!await productService.DoesProductExistByIdAsync(keyValuePair.Key))
					{
						logger.LogDebug(
							$"Failed to add product with id {keyValuePair.Key} to the order. The given Product id doesn't exist at all.");
						return BadRequest("The product Id doesn't exist");
					}

					var currentProduct = await productService.GetByIdAsync(keyValuePair.Key);

					var orderProductEntity = new OrderProductEntity
					{
						Amount = keyValuePair.Value,
						OrderId = orderEntity.Id,
						ProductId = currentProduct.Id
					};
					orderProductList.Add(orderProductEntity);

					totalPrice += currentProduct.Prices.Find(x => x.CurrencyId == model.CurrencyId).Price * keyValuePair.Value;
				}

				orderEntity.TotalPrice = totalPrice;
				await orderService.AddOrderAsync(orderEntity);

				logger.LogInformation($"Successfully added new order.");

				await orderService.AddAllOrderProductsAsync(orderProductList);

				logger.LogInformation($"Successfully added new orderProductEntity.");
				return Ok(orderEntity);
			}
			else
			{
				logger.LogWarning($"Erorr while adding Order. Validation failed");

				return BadRequest(ModelState.ToApiV1ErrorResponseModel());
			}
		}

		/// <summary>
		/// Returns the order with the specified id
		/// </summary>
		/// <param name="id">Order id</param>
		/// <response code="200">Order returned successfully</response>
		/// <response code="403">No permissions to get the order</response>
		/// <response code="404">Order with the specified id not found</response>
		/// <response code="500">An internal error occurred</response>
		[HttpGet("{id}")]
		[ProducesResponseType(typeof(ApiV1OrderResponseModel), 200)]
		[ProducesResponseType(403)]
		[ProducesResponseType(404)]
		[ProducesResponseType(typeof(ApiV1ErrorResponseModel), 500)]
		public async Task<IActionResult> GetById([FromRoute] Guid id)
		{
			logger.LogDebug($"Attempting to get product with id {id}.");

			var order = await orderService.GetByIdAsync(id);

			if (order == null)
			{
				logger.LogWarning($"Order with id {id} could not be found.");

				return NotFound();
			}

			return Json(order);
		}
	}
}