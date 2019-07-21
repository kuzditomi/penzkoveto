using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using PenzKoveto.Repository.Models;

namespace PenzKoveto.Web.Models
{
    public class AddItemModel
    {
        public string Description { get; set; }
        
        [Required]
        [Range(0, 500000)]
        public double? Cost { get; set; }

        public int? CategoryId { get; set; }

        public ItemType Type { get; set; }
    }
}