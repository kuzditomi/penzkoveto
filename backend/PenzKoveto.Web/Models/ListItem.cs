﻿using System;
using PenzKoveto.Repository.Models;

namespace PenzKoveto.Web.Models
{
    public class ListItem
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public CategoryListItem Category { get; set; }
        public double Cost { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }

        public ListItem(Item from)
        {
            this.Id = from.Id;
            this.Description = from.Name;
            this.Cost = from.Cost;
            this.Date = from.Date;
            this.Type = from.Type == ItemType.Income ? "Bevétel" : "Kiadás";
            this.Category = from.Category == null ? CategoryListItem.Empty : new CategoryListItem(from.Category);
        }
    }
}