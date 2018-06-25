using System;
using System.Buffers.Text;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Moq;
using webspec3.Entities;
using webspec3.Services.Impl;
using Xunit;

namespace webspec3Tests
{
	
	/// <summary>
	/// J. Mauthe
	/// </summary>
	public class ProductTest : DatabaseTestBase
	{
		[Fact]
		public void TestProductCreateAndUpdate()
		{
			RunTestWithDbContext(async context =>
			{
				var i18NService = new I18nService(context, new HttpContextAccessor(), Mock.Of<ILogger<I18nService>>());
				var imageService = new ImageService(context, Mock.Of<ILogger<ImageService>>());
				var wishlistService = new WishlistService(context, Mock.Of<ILogger<WishlistService>>());
				var categoryService = new CategoryService(context, Mock.Of<ILogger<CategoryService>>());
				var productService = new ProductService(context, i18NService,
					Mock.Of<ILogger<ProductService>>(), imageService, wishlistService);

				// Add a category which is necessary for the product creation
				var category = new CategoryEntity
				{
					Title = "Hard Rock"
				};

				await categoryService.AddAsync(category);

				Assert.Empty(await productService.GetAllAsync());

				// Create product
				var product = new ProductEntity
				{
					Artist = "Artist",
					CategoryId = category.Id,
					Label = "test",
					ReleaseDate = DateTime.Today,
					Image = new ImageEntity
					{
						Base64String = "asf23523sdfk",
						Description = "Hard Rock image",
						ImageType = "jpg"
					}
				};

				// Create product prices
				var productPriceEntities = new List<ProductPriceEntity>
				{
					new ProductPriceEntity
					{
						CurrencyId = "EUR",
						Price = 9,
						ProductId = product.Id
					},
					new ProductPriceEntity
					{
						CurrencyId = "USD",
						Price = 20,
						ProductId = product.Id
					}
				};

				// Create product translations
				var productTranslationEntities = new List<ProductTranslationEntity>
				{
					new ProductTranslationEntity
					{
						Description = "Deutsche Beschreibung",
						DescriptionShort = "kurz",
						LanguageId = "de_DE",
						ProductId = product.Id,
						Title = "Deutsches Produkt"
					},
					new ProductTranslationEntity
					{
						Description = "English Description",
						DescriptionShort = "short",
						LanguageId = "en_US",
						ProductId = product.Id,
						Title = "English Product"
					}
				};

				await productService.AddAsync(product, productPriceEntities, productTranslationEntities);

				//Test Products
				Assert.NotNull(await productService.GetByIdAsync(product.Id));
				Assert.Null(await productService.GetByIdAsync(new Guid()));
				Assert.Equal(1, productService.GetAllAsync().Result.Count);
				Assert.True(await productService.DoesProductExistByIdAsync(product.Id));

				Assert.NotNull(await imageService.GetByIdAsync(product.ImageId));
				Assert.True(categoryService.DoesCategoryNameExist(category.Title));
				Assert.Equal(1, categoryService.GetAllAsync().Result.Count);

				// Add a second category
				var secondCategory = new CategoryEntity
				{
					Title = "Rock"
				};

				await categoryService.AddAsync(secondCategory);

				var updatedProduct = product;
				updatedProduct.Id = product.Id;
				updatedProduct.CategoryId = secondCategory.Id;
				await productService.UpdateAsync(updatedProduct);

				//Test Updated Product
				Assert.NotNull(await productService.GetByIdAsync(updatedProduct.Id));
				Assert.Null(await productService.GetByIdAsync(new Guid()));
				Assert.Equal(1, productService.GetAllAsync().Result.Count);
				Assert.True(await productService.DoesProductExistByIdAsync(updatedProduct.Id));

				Assert.True(categoryService.DoesCategoryNameExist(secondCategory.Title));
				Assert.Equal(2, categoryService.GetAllAsync().Result.Count);
				Assert.Equal("Rock", productService.GetByIdAsync(updatedProduct.Id).Result.Category.Title);
			});
		}

		[Fact]
		public void TestProductDelete()
		{
			RunTestWithDbContext(async context =>
			{
				var i18NService = new I18nService(context, new HttpContextAccessor(), Mock.Of<ILogger<I18nService>>());
				var imageService = new ImageService(context, Mock.Of<ILogger<ImageService>>());
				var wishlistService = new WishlistService(context, Mock.Of<ILogger<WishlistService>>());
				var categoryService = new CategoryService(context, Mock.Of<ILogger<CategoryService>>());
				var productService = new ProductService(context, i18NService,
					Mock.Of<ILogger<ProductService>>(), imageService, wishlistService);

				// Add a category which is necessary for the product creation
				var category = new CategoryEntity
				{
					Title = "Hard Rock"
				};

				await categoryService.AddAsync(category);

				Assert.Empty(await productService.GetAllAsync());

				// Create product
				var product = new ProductEntity
				{
					Artist = "Artist",
					CategoryId = category.Id,
					Label = "test",
					ReleaseDate = DateTime.Today,
					Image = new ImageEntity
					{
						Base64String = "asf23523sdfk",
						Description = "Hard Rock image",
						ImageType = "jpg"
					}
				};

				// Create product prices
				var productPriceEntities = new List<ProductPriceEntity>
				{
					new ProductPriceEntity
					{
						CurrencyId = "EUR",
						Price = 9,
						ProductId = product.Id
					},
					new ProductPriceEntity
					{
						CurrencyId = "USD",
						Price = 20,
						ProductId = product.Id
					}
				};

				// Create product translations
				var productTranslationEntities = new List<ProductTranslationEntity>
				{
					new ProductTranslationEntity
					{
						Description = "Deutsche Beschreibung",
						DescriptionShort = "kurz",
						LanguageId = "de_DE",
						ProductId = product.Id,
						Title = "Deutsches Produkt"
					},
					new ProductTranslationEntity
					{
						Description = "English Description",
						DescriptionShort = "short",
						LanguageId = "en_US",
						ProductId = product.Id,
						Title = "English Product"
					}
				};

				await productService.AddAsync(product, productPriceEntities, productTranslationEntities);

				//Test Products
				Assert.NotNull(await productService.GetByIdAsync(product.Id));
				Assert.Null(await productService.GetByIdAsync(new Guid()));
				Assert.Equal(1, productService.GetAllAsync().Result.Count);
				Assert.True(await productService.DoesProductExistByIdAsync(product.Id));

				//Remove Product

				await productService.DeleteAsync(product);

				Assert.Null(await productService.GetByIdAsync(product.Id));
				Assert.Equal(0, productService.GetAllAsync().Result.Count);
				Assert.False(await productService.DoesProductExistByIdAsync(product.Id));
			});
		}
	}
}
