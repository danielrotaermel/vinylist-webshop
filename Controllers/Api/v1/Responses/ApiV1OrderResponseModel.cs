using System;
using System.Collections.Generic;
using webspec3.Entities;

namespace webspec3.Controllers.Api.v1.Responses
{
	/// <summary>
	///
	/// J. Mauthe
	/// </summary>
	public class ApiV1OrderResponseModel
	{
		/// <summary>
		/// Product id
		/// </summary>
		public Guid Id { get; set; }

		/// <summary>
		/// A Map representing the product as a key and the amount as Value
		/// </summary>
		public Dictionary<ProductEntity, int> OrderProducts = new Dictionary<ProductEntity, int>();
	}
}