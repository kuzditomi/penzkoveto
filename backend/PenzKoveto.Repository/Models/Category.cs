﻿namespace PenzKoveto.Repository.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }
    }
}