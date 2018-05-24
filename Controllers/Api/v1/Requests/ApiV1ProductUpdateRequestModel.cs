using System;

namespace webspec3.Controllers.Api.v1.Requests
{
    /// <summary>
    /// Model describing a product update request
    /// 
    /// M. Narr
    /// </summary>
    public sealed class ApiV1ProductUpdateRequestModel : ApiV1ProductCreateUpdateRequestModelBase
    {
        /// <summary>
        /// Product id
        /// </summary>
        public Guid? Id { get; set; }
    }
}
