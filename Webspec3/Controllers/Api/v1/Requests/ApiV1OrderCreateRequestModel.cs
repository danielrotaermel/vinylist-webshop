using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using webspec3.Entities;

namespace webspec3.Controllers.Api.v1.Requests
{
	/// <summary>
	/// 
	/// Model describing an order create request
	///
	/// J. Mauthe
	/// </summary>
	public class ApiV1OrderCreateRequestModel
	{
		/// <summary>
		/// Dictionary with key product Id and Value the amount of this product
		/// </summary>
		public Dictionary<Guid, int> ProductList { get; set; }

		/// <summary>
		/// Currency id of this order. Must be EUR or USD
		/// </summary>
		[Required(AllowEmptyStrings = false)]
		public string CurrencyId { get; set; }
	}
}