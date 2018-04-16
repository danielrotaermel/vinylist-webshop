using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace webspec3.Entities
{
    public abstract class EntityBase
    {
        /// <summary>
        /// The entitie's id
        /// </summary>
        [Column("id")]
        public Guid Id { get; set; }
    }
}
