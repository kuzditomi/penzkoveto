using PenzKoveto.Repository;
using Penzkoveto.Web.Models;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Penzkoveto.Web.Controllers
{
    [ApiController]
    [Route("api/charts")]
    public class ChartsController : PenzKovetoControllerBase
    {
        private readonly IMoneyRepository moneyRepository;

        public ChartsController(IMoneyRepository moneyRepository)
        {
            this.moneyRepository = moneyRepository;
        }

        [HttpGet]
        [Route("{year?}/{month?}")]
        public ActionResult GetChartData(int year = 0, int month = 0)
        {
            year = year == 0 || month == 0 ? DateTime.Now.Year : year;
            month = month == 0 || month == 0 ? DateTime.Now.Month : month;

            var from = new DateTime(year, month, 1);
            var to = from.AddMonths(1);

            var items = moneyRepository.GetItems(CurrentUserId, from, to)
                    .Select(i => new ListItem(i))
                    .ToList();

            var categories = moneyRepository.GetCategories(CurrentUserId)
                .Select(c => new CategoryListItem(c))
                .ToList();
            
            categories.Add(CategoryListItem.Empty);

            var model = new ChartViewModel
            {
                Categories = categories,
                Items = items
            };

            return Ok(model);
        }
    }
}