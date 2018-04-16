using System.Collections.Generic;

namespace webspec3.Controllers.Api.v1.Responses
{
    /// <summary>
    /// Model representing an api error
    /// 
    /// M. Narr
    /// </summary>
    public class ApiV1ErrorResponseModel
    {
        /// <summary>
        /// Optional error code
        /// </summary>
        public int? ErrorCode { get; set; }

        /// <summary>
        /// Error message
        /// </summary>
        public string ErrorMessage { get; set; }

        /// <summary>
        /// Whether the error is a validation error
        /// </summary>
        public bool IsValidationError => ValidationErrors.Count > 0;

        /// <summary>
        /// List of validation errors associated with this error
        /// </summary>
        public List<ValidationError> ValidationErrors { get; set; } = new List<ValidationError>();

        /// <summary>
        /// Creates a new instance of <see cref="ApiV1ErrorResponseModel"/>
        /// </summary>
        public ApiV1ErrorResponseModel()
        {

        }

        /// <summary>
        /// Creates a new instance of <see cref="ApiV1ErrorResponseModel"/>
        /// </summary>
        /// <param name="errorMessage">Error message</param>
        public ApiV1ErrorResponseModel(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }

        /// <summary>
        /// Creates a new instance of <see cref="ApiV1ErrorResponseModel"/>
        /// </summary>
        /// <param name="errorMessage">Error message</param>
        /// <param name="errorCode">Error code</param>
        public ApiV1ErrorResponseModel(string errorMessage, int? errorCode)
        {
            ErrorMessage = errorMessage;
            ErrorCode = errorCode;
        }

        /// <summary>
        /// Class representing a validation error
        /// 
        /// M. Narr
        /// </summary>
        public sealed class ValidationError
        {
            /// <summary>
            /// Field on which the validation error occurred
            /// </summary>
            public string Field { get; set; }

            /// <summary>
            /// Validation error message
            /// </summary>
            public string Message { get; set; }

            /// <summary>
            /// Creates a new instance of see <see cref="ValidationError"/>
            /// </summary>
            /// <param name="field">Affected field</param>
            /// <param name="message">Message</param>
            public ValidationError(string field, string message)
            {
                Field = field;
                Message = message;
            }
        }
    }
}
