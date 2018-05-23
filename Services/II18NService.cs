using System.Collections.Generic;
using webspec3.Core.I18n;

namespace webspec3.Services
{
    /// <summary>
    /// Basic service interface to provide i18n options for both language and currency
    /// 
    /// M. Narr
    /// </summary>
    public interface II18nService
    {
        /// <summary>
        /// List of all supported languages
        /// </summary>
        List<SupportedLanguage> SupportedLanguages { get; }

        /// <summary>
        /// List of all supported currencies
        /// </summary>
        List<SupportedCurrency> SupportedCurrencies { get; }


        /// <summary>
        /// Returns the currently selected language
        /// </summary>
        /// <returns>Instance of <see cref="SupportedLanguage"/></returns>
        SupportedLanguage GetCurrentLanguage();

        /// <summary>
        /// Returns the currently selected currency
        /// </summary>
        /// <returns>Instance of <see cref="SupportedCurrency"/></returns>
        SupportedCurrency GetCurrentCurrency();
    }
}
