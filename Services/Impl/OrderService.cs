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
	}
}