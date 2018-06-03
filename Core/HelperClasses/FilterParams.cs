namespace webspec3.Core.HelperClasses
{
    /// <summary>
    /// Core class to hold information about filtering
    /// 
    /// M. Narr
    /// </summary>
    public sealed class FilterParams
    {
        /// <summary>
        /// Specifies the column to filter by
        /// </summary>
        public string FilterBy { get; set; }

        /// <summary>
        /// Specifies the filter query
        /// </summary>
        public string FilterQuery { get; set; }

        /// <summary>
        /// Specifies the l10n being used for filtering
        /// </summary>
        public string FilterLanguage { get; set; }
    }
}
