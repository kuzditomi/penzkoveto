using PenzKoveto.Repository;
using PenzKoveto.Web.Models;
using System;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Penzkoveto.Web.Controllers
{
    [ApiController]
    [Route("api/statistics")]
    public class StatisticsController : PenzKovetoControllerBase
    {
        private readonly IMoneyRepository moneyRepository;

        public StatisticsController(IMoneyRepository moneyRepository)
        {
            this.moneyRepository = moneyRepository;
        }

        [HttpGet]
        [Route("")]
        public ActionResult GetStatistics()
        {
            var from = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var to = DateTime.Now;

            var categories = moneyRepository.GetCategories(CurrentUserId);
            try
            {
                var statistics = moneyRepository.GetStatistics(CurrentUserId, from, to);

                var viewModel = new Statistics
                {
                    CategoryStatistics = statistics.CategoryStatistics.Select(s =>
                    {
                        var cat = categories.FirstOrDefault(c => c.Id == s.CategoryId);

                        return new CategoryStatistics
                        {
                            Category = cat == null ? null : new CategoryListItem(cat),
                            Cost = s.Cost
                        };
                    })
                };

                return Ok(viewModel);
            } catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return Ok(null);
        }
    }
}