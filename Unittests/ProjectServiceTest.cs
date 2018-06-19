using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SQLitePCL;
using webspec3.Entities;
using webspec3.Services.Impl;
using Xunit;
using Moq;

namespace webspec3.Unittests
{
	public class ProjectServiceTest : DatabaseTestBase
	{
		[Fact]
		public void testCreateProduct()
		{
			WithMockContext(async context =>
			{
				var imageService = new ImageService(context, Mock.Of<ILogger<ImageService>>());
				var i18NService = new I18nService(context, Mock.Of<HttpContextAccessor>(),
					Mock.Of<ILogger<I18nService>>());
				var productService = new ProductService(context, i18NService, Mock.Of<ILogger<ProductService>>(),
					imageService);


				var category = new CategoryEntity
				{
					Title = "Hard Rock"
				};

				var image = Mock.Of<ImageEntity>();
				
				var prices = new ProductPriceEntity
				{
				}
				
				var product = new ProductEntity
				{
					Artist = "TestArtist",
					Category = category,
					CategoryId = category.Id,
					Id = Guid.NewGuid(),
					Image = image,
					ImageId = image.Id,
					Label = "TestLabel",
					
					
				}

			});
		}
	}
}