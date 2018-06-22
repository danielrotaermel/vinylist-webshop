namespace webspec3.Core.I18n
{
    /// <summary>
    /// M. Narr
    /// </summary>
    public sealed class SupportedLanguage
    {
        /// <summary>
        /// Language title, e.g. German
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Language code, e.g. de_DE
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Whether this language is the default one
        /// </summary>
        public bool IsDefault { get; set; }
    }
}
