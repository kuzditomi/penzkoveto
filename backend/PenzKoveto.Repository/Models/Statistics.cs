using System.Collections.Generic;

namespace PenzKoveto.Repository.Models
{
    public class Statistics
    {
        public IEnumerable<CategoryStatistics> CategoryStatistics { get; set; }
    }
}