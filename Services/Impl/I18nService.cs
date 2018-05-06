using System.Collections.Generic;
using webspec3.Core.I18n;

namespace webspec3.Services.Impl
{
    /// <summary>
    /// Basic implementation of <see cref="II18nService"/>
    /// 
    /// M. Narr
    /// </summary>
    public sealed class I18nService : II18nService
    {
        public List<SupportedCurrency> SupportedCurrencies { get; } = new List<SupportedCurrency>();

        public List<SupportedLanguage> SupportedLanguages { get; } = new List<SupportedLanguage>();


        public SupportedCurrency GetCurrentCurrency()
        {
            // TODO
            return new SupportedCurrency
            {
                Code = "EUR",
                Title = "Euro"
            };
        }

        public SupportedLanguage GetCurrentLanguage()
        {
            // TOOD
            return new SupportedLanguage
            {
                Code = "de_DE",
                Title = "German"
            };
        }
    }
}
