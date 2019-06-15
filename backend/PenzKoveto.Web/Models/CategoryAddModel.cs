using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Penzkoveto.Web.Models
{
    public class CategoryAddModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [RegularExpression("^#[0-9a-fA-F]{6}")]
        public string Color { get; set; }
    }
}