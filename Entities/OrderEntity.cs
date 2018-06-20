using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webspec3.Controllers.Api.v1.Responses;

namespace webspec3.Entities
{
	/// <summary>
	/// Model representing an order within the webshop
	/// 
	/// J. Mauthe
	/// </summary>
	public class OrderEntity : EntityBase
	{
		/// <summary>
		/// The user's Id
		/// </summary>
		[Required]
		[Column("user_id")]
		public Guid UserId { get; set; }

		/// <summary>
		/// The currency's Id
		/// </summary>
		[Required]
		[Column("currency_id")]
		public string CurrencyId { get; set; }

		/// <summary>
		/// The total price of this order
		/// </summary>
		[Required]
		[Column("total_price")]
		public decimal TotalPrice { get; set; }

		public List<OrderProductEntity> OrderProductEntities { get; set; }
	}
}