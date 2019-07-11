using System.Collections.Generic;

namespace PenzKoveto.Web.Models
{
    public class Statistics
    {
        public IEnumerable<CategoryStatistics> CategoryStatistics { get; set; }
    }
}