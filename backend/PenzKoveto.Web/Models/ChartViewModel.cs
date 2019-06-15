using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PenzKoveto.Repository.Models;

namespace Penzkoveto.Web.Models
{
    public class ChartViewModel
    {
        public List<CategoryListItem> Categories { get; set; }
        public List<ListItem> Items { get; set; }
    }
}