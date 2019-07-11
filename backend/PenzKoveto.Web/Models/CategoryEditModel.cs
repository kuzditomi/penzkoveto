using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using PenzKoveto.Repository.Models;

namespace PenzKoveto.Web.Models
{
    public class CategoryEditModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [RegularExpression("^#[0-9a-fA-F]{6}")]
        public string Color { get; set; }

        public CategoryEditModel()
        {

        }
        public CategoryEditModel(Category from)
        {
            this.Id = from.Id;
            this.Name = from.Name;
            this.Color = from.Color;
        }
    }
}