using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webspec3.Entities
{
    /// <summary>
    /// This database entity represents an user within the webshop
    /// M. Narr
    /// </summary>
    public sealed class UserEntity
    {
        /// <summary>
        /// The user's id
        /// </summary>
        [Column("id")]
        public Guid Id { get; set; }

        /// <summary>
        /// The user's first name
        /// </summary>
        [Required]
        [Column("first_name")]
        public string FirstName { get; set; }

        /// <summary>
        /// The user's last name
        /// </summary>
        [Required]
        [Column("last_name")]
        public string LastName { get; set; }

        /// <summary>
        /// The user's billing address' id
        /// </summary>
        [Required]
        [Column("billing_address_id")]
        public Guid BillingAddressId { get; set; }

        /// <summary>
        /// The users's address' id
        /// </summary>
        [Required]
        [Column("address_id")]
        public Guid AddressId { get; set; }

        /// <summary>
        /// The user's username
        /// </summary>
        [Required]
        [Column("username")]
        public string Username { get; set; }

        /// <summary>
        /// The user's email
        /// </summary>
        [Required]
        [Column("email")]
        public string Email { get; set; }

        /// <summary>
        /// The user's password
        /// </summary>
        [Required]
        [Column("password")]
        public string Password { get; set; }
    }
}
