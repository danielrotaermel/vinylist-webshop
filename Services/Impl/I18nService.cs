using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;
using System.Linq;
using webspec3.Core.I18n;
using webspec3.Database;

namespace webspec3.Services.Impl
{
    /// <summary>
    /// Basic implementation of <see cref="II18nService"/>
    /// 
    /// M. Narr
    /// </summary>
    public sealed class I18nService : II18nService
    {
        public const string HEADER_CURRENCY = "X-WebSpec-Currency-Code";
        public const string HEADER_LANGUAGE = "X-WebSpec-Language-Code";

        private readonly WebSpecDbContext dbContext;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ILogger logger;

        public I18nService(WebSpecDbContext dbContext, IHttpContextAccessor httpContextAccessor, ILogger<I18nService> logger)
        {
            this.dbContext = dbContext;
            this.httpContextAccessor = httpContextAccessor;
            this.logger = logger;

            // Load all supported currencies and languages from the database
            logger.LogDebug($"Attempting to load all available currencies and languages from the database.");

            SupportedCurrencies = dbContext.Currencies
                .Select(x => new SupportedCurrency
                {
                    Code = x.Id,
                    Title = x.Title,
                    IsDefault = x.IsDefault
                })
                .ToList();

            SupportedLanguages = dbContext.Languages
                .Select(x => new SupportedLanguage
                {
                    Code = x.Id,
                    Title = x.Title,
                    IsDefault = x.IsDefault
                })
                .ToList();

            logger.LogInformation($"Loaded {SupportedCurrencies.Count} supported currencies and {SupportedLanguages.Count} supported languages from the database.");
        }

        /// <summary>
        /// Specifies all supported currencies
        /// </summary>
        public List<SupportedCurrency> SupportedCurrencies { get; private set; } = new List<SupportedCurrency>();

        /// <summary>
        /// Specifies all supported languages
        /// </summary>
        public List<SupportedLanguage> SupportedLanguages { get; private set; } = new List<SupportedLanguage>();


        public SupportedCurrency GetCurrentCurrency()
        {
            // Check if the custom currency header is present
            var isHeaderPresent = httpContextAccessor.HttpContext.Request.Headers.TryGetValue(HEADER_CURRENCY, out StringValues stringValues);

            // Check if the currency is supported
            if (isHeaderPresent && SupportedCurrencies.Any(x => x.Code == stringValues.FirstOrDefault()))
            {
                return SupportedCurrencies.FirstOrDefault(x => x.Code == stringValues.FirstOrDefault());
            }
            else
            {
                return SupportedCurrencies
                    .Where(x => x.IsDefault)
                    .FirstOrDefault();
            }
        }

        public SupportedLanguage GetCurrentLanguage()
        {
            // Check if the custom language header is present
            var isHeaderPresent = httpContextAccessor.HttpContext.Request.Headers.TryGetValue(HEADER_LANGUAGE, out StringValues stringValues);

            // Check if the language is supported
            if (isHeaderPresent && SupportedLanguages.Any(x => x.Code == stringValues.FirstOrDefault()))
            {
                return SupportedLanguages.FirstOrDefault(x => x.Code == stringValues.FirstOrDefault());
            }
            else
            {
                return SupportedLanguages
                    .Where(x => x.IsDefault)
                    .FirstOrDefault();
            }
        }
    }
}
