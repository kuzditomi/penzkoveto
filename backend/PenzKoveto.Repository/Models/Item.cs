using System;

namespace PenzKoveto.Repository.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Cost { get; set; }

        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

        public int? CategoryId { get; set; }
        public virtual Category Category { get; set; }

        public DateTime Date { get; set; }

        public ItemType Type { get; set; }
    }
}