using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webspec3.Entities
{
	/// <summary>
	/// Model representing a product within an order
	/// 
	/// J. Mauthe
	/// </summary>
	public class OrderProductEntity
	{
		/// <summary>
		/// Order id
		/// </summary>
		[Column("order_id")]
		[Required]
		public Guid OrderId { get; set; }

		public OrderEntity Order { get; set; }

		/// <summary>
		/// Product id
		/// </summary>
		[Column("product_id")]
		[Required]
		public Guid ProductId { get; set; }

		public ProductEntity Product { get; set; }

		/// <summary>
		/// Product amount
		/// </summary>
		[Column("amount")]
		[Required]
		public int Amount { get; set; }
	}
}