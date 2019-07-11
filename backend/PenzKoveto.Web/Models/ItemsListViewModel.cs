using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PenzKoveto.Web.Models
{
    public class ItemsListViewModel
    {
        public List<ListItem> List { get; set; }

        public string SelectedMonth { get; set; }
    }
}