using System;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using webspec3.Database;
using webspec3.Entities;

namespace webspec3Tests
{
	
	/// <summary>
	/// J. Mauthe
	/// </summary>
	public abstract class DatabaseTestBase
	{
		protected WebSpecDbContext ProvideDbContext(SqliteConnection connection)
		{
			var options = new DbContextOptionsBuilder<WebSpecDbContext>()
				.UseSqlite(connection)
				.Options;

			// Create the schema in the database
			using (var context = new WebSpecDbContext(options))
			{
				context.Database.EnsureCreated();
			}

			return new WebSpecDbContext(options);
		}

		protected void RunTestWithDbContext(Action<WebSpecDbContext> action)
		{
			var connection = new SqliteConnection("DataSource=:memory:");
			connection.Open();

			try
			{
				using (var context = ProvideDbContext(connection))
				{
					// Add currencies
					context.Currencies.AddAsync(new CurrencyEntity
					{
						Id = "EUR",
						IsDefault = true,
						Title = "Euro"
					});
				
					context.Currencies.AddAsync(new CurrencyEntity
					{
						Id = "USD",
						IsDefault = false,
						Title = "US Dollar"
					});
					
					// Add languages

					context.Languages.AddAsync(new LanguageEntity
					{
						Id = "de_DE",
						IsDefault = true,
						Title = "German"
					});
					
					context.Languages.AddAsync(new LanguageEntity
					{
						Id = "en_US",
						IsDefault = false,
						Title = "English (US)"
					});
					
					context.SaveChangesAsync();
					
					action.Invoke(context);
				}
			}
			finally
			{
				connection.Close();
			}
		}
	}
}