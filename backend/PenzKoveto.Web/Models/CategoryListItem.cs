using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PenzKoveto.Repository.Models;

namespace PenzKoveto.Web.Models
{
    public class CategoryListItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }

        private CategoryListItem()
        {
        }

        public CategoryListItem(Category from)
        {
            if (from == null)
            {
                return;
            }
            
            this.Id = from.Id;
            this.Name = from.Name;
            this.Color = from.Color;
        }

        public static CategoryListItem Empty = new CategoryListItem
        {
            Id = 0,
            Name = "Kategorizálatlan",
            Color = "#000000"
        };
    }
}