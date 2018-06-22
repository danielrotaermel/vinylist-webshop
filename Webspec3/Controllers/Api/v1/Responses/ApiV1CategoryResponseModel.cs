using System;

namespace webspec3.Controllers.Api.v1.Responses
{
    /// <summary>
    /// Response model describing a category get request
    /// 
    /// M. Narr
    /// </summary>
    public class ApiV1CategoryResponseModel
    {
        /// <summary>
        /// The category's id
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// The category's title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Specifies how many products are associated with this category
        /// </summary>
        public long ProductCount { get; set; }
    }
}
