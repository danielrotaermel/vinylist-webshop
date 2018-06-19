using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webspec3.Entities;

namespace webspec3.Services
{
	/// <summary>
	/// Base service for accessing orders
	///
	/// J. Mauthe
	/// </summary>
	public interface IOrderService
	{
		/// <summary>
		/// Adds new order to the databae
		/// </summary>
		/// <param name="entity">Order Entity</param>
		/// <returns></returns>
		Task AddOrderAsync(OrderEntity entity);

		/// <summary>
		/// Adds a list of OrderProductEntities to the database
		/// </summary>
		/// <param name="entityList">List of entities</param>
		/// <returns></returns>
		Task AddAllOrderProductsAsync(List<OrderProductEntity> entityList);

		/// <summary>
		/// Returns the order with the specified id/>
		/// </summary>
		/// <param name="id">Order id</param>
		/// <returns>Order with the specified id/></returns>
		Task<OrderEntity> GetByIdAsync(Guid id);

		/// <summary>
		/// Returns a list of all orders of the current logged in user/>/>
		/// </summary>
		/// <returns>List of all orders of the current logged in user/></returns>
		Task<List<OrderEntity>> GetAllAsync(Guid userId);
		      
		/// <summary>
		/// Removes a given order from the database
		/// </summary>
		/// <param name="entity">Entity of Order</param>
		/// <returns></returns>
		Task DeleteAsync(OrderEntity entity);
		
		/// <summary>
		/// Removes all orders for a given user
		/// </summary>
		/// <param name="userId">Id of the user</param>
		/// <returns></returns>
		Task DeleteAll(Guid userId);

	}
}