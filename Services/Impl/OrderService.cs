using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.DynamicLinq;
using Microsoft.Extensions.Logging;
using webspec3.Database;
using webspec3.Entities;

namespace webspec3.Services.Impl
{
	/// <summary>
	/// Implementation of IOrderService
	///
	/// J. Mauthe
	/// </summary>
	public class OrderService : IOrderService
	{
		private readonly WebSpecDbContext dbContext;
		private readonly ILogger logger;

		public OrderService(ILogger<OrderService> logger, WebSpecDbContext dbContext)
		{
			this.logger = logger;
			this.dbContext = dbContext;
		}

		public async Task AddOrderAsync(OrderEntity entity)
		{
			await dbContext.Orders.AddRangeAsync(entity);

			await dbContext.SaveChangesAsync();
		}

		public async Task AddAllOrderProductsAsync(List<OrderProductEntity> entityList)
		{
			await dbContext.OrdersProducts.AddRangeAsync(entityList);

			await dbContext.SaveChangesAsync();
		}

		public async Task<OrderEntity> GetByIdAsync(Guid id)
		{
			var order = await dbContext.Orders
				.Where(x => x.Id == id)
				.Include(x => x.OrderProductEntities)
				.ThenInclude(x => x.Product)
				.ThenInclude(x => x.Prices)
				.Include(x => x.OrderProductEntities)
				.ThenInclude(x => x.Product)
				.ThenInclude(x => x.Translations)
				.FirstOrDefaultAsync();

			return order;
		}

		public async Task<List<OrderEntity>> GetAllAsync(Guid userId)
		{
			var orders = await dbContext.Orders
				.Where(x => x.UserId == userId)
				.ToListAsync();

			return orders;
		}

		public async Task DeleteAsync(OrderEntity entity)
		{
			logger.LogDebug($"Attempting to remove Order with id {entity.Id}");

			using (var transaction = await dbContext.Database.BeginTransactionAsync())
			{
				dbContext.Orders.Remove(entity);

				await dbContext.SaveChangesAsync();

				transaction.Commit();
			}

			logger.LogDebug($"Successfully removed order with id {entity.Id}");
		}

		public async Task DeleteAll(Guid userId)
		{
			logger.LogDebug($"Attempting to remove all orders for user with id {userId}");

			var orders = await dbContext.Orders
				.Where(x => x.UserId == userId)
				.ToListAsync();

			foreach (var order in orders)
			{
				await DeleteAsync(order);
			}

			logger.LogDebug($"Successfully removed all order for user with id {userId}");
		}
	}
}