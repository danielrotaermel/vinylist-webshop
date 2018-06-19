using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using webspec3.Database;

namespace webspec3.Unittests
{
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

		protected void WithMockContext(Action<WebSpecDbContext> action)
		{
			var connection = new SqliteConnection("DataSource=:memory:");
			connection.Open();

			try
			{
				using (var context = ProvideDbContext(connection))
				{
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