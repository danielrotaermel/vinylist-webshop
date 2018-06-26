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
		/// Order id
		/// </summary>
		public Guid Id { get; set; }

		/// <summary>
		/// User id
		/// </summary>
		public Guid UserId { get; set; }

		public string CurrencyId { get; set; }

		public decimal TotalPrice { get; set; }

		/// <summary>
		/// A Map representing the product as a key and the amount as Value
		/// </summary>
		public List<ApiV1OrderProductResponseModel> OrderProducts { get; set; } =
			new List<ApiV1OrderProductResponseModel>();


		/// <summary>
		/// M. Narr
		/// </summary>
		public sealed class ApiV1OrderProductResponseModel
		{
			/// <summary>
			/// Product
			/// </summary>
			public ApiV1ProductReponseModel product { get; set; }

			/// <summary>
			/// Amount
			/// </summary>
			public int Amount { get; set; }
		}
	}
}