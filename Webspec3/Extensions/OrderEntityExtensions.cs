using System.Linq;
using webspec3.Controllers.Api.v1.Responses;
using webspec3.Entities;

namespace webspec3.Extensions
{
	/// <summary>
	/// J. Mauthe
	/// </summary>
	public static class OrderEntityExtensions
	{
		/// <summary>
		/// 
		/// </summary>
		/// <param name="orderEntity"></param>
		/// <returns></returns>
		public static ApiV1OrderResponseModel ToApiV1OrderResponseModel(this OrderEntity orderEntity)
		{
			var orderResponse = new ApiV1OrderResponseModel
			{
				CurrencyId = orderEntity.CurrencyId,
				Id = orderEntity.Id,
				UserId = orderEntity.UserId,
				TotalPrice = orderEntity.TotalPrice,
				OrderProducts = orderEntity.OrderProductEntities.Select(x =>
					new ApiV1OrderResponseModel.ApiV1OrderProductResponseModel
					{
						Amount = x.Amount,
						product = x.Product.ToApiV1ProductResponseModel()
					}).ToList()
			};
			return orderResponse;
		}
	}
}