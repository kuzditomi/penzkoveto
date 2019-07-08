using PenzKoveto.Repository;
using PenzKoveto.Repository.Models;
using Penzkoveto.Web.Models;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Penzkoveto.Web.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/items")]
    public class ItemsController : PenzKovetoControllerBase
    {
        private readonly IMoneyRepository moneyRepository;

        public ItemsController(IMoneyRepository moneyRepository)
        {
            this.moneyRepository = moneyRepository;
        }

        [HttpGet]
        [Route("")]
        public ActionResult GetItems()
        {
            var list = moneyRepository.GetItems(CurrentUserId)
                    .Select(i => new ListItem(i))
                    .ToList();

            return Ok(list);
        }
        
        [HttpGet]
        [Route("{year}/{month}")]
        public ActionResult GetItemList(int year = 0, int month = 0)
        {
            year = year == 0 || month == 0 ? DateTime.Now.Year : year;
            month = month == 0 || month == 0 ? DateTime.Now.Month : month;

            var from = new DateTime(year, month, 1);
            var to = from.AddMonths(1);

            var list = moneyRepository.GetItems(CurrentUserId, from, to)
                    .Select(i => new ListItem(i))
                    .ToList();

            var vm = new ItemsListViewModel
            {
                List = list,
                SelectedMonth = String.Format(@"{0}/{1:00}", year, month)
            };

            return Ok(vm);
        }

        [HttpGet]
        [Route("uncategorized")]
        public ActionResult GetUncategorizedItems()
        {
            var items = moneyRepository.GetUncategorizedItems(CurrentUserId)
                .Select(i => new ListItem(i))
                .ToList();

            return Ok(items);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult GetItemById(int id)
        {
            var item = moneyRepository.GetItem(id);

            if (item == null)
            {
                return NotFound();
            }

            if (item.UserId != CurrentUserId)
            {
                return BadRequest();
            }

            var vm = new EditItemModel
            {
                Id = item.Id,
                CategoryId = item.CategoryId,
                Cost = item.Cost,
                Name = item.Name,
                Type = item.Type
            };

            return Ok(vm);
        }

        [HttpPost]
        [Route("")]
        public ActionResult Add(AddItemModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            try
            {
                var item = new Item
                {
                    Name = model.Name,
                    Cost = model.Cost.Value,
                    UserId = CurrentUserId,
                    Date = DateTime.UtcNow,
                    CategoryId = model.CategoryId,
                    Type = model.Type
                };

                moneyRepository.AddItem(item);

                return Ok();
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Hiba történt. Bocsi");
                return new StatusCodeResult(500);
            }
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult Update(int id, EditItemModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var item = moneyRepository.GetItem(model.Id);
            if (item == null)
            {
                return NotFound();
            }

            if (item.UserId != CurrentUserId)
            {
                return Unauthorized();
            }

            moneyRepository.UpdateItem(new Item
            {
                Id = model.Id,
                Name = model.Name,
                CategoryId = model.CategoryId,
                Cost = model.Cost.Value,
                Type = model.Type
            });

            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Remove(int id)
        {
            var item = moneyRepository.GetItem(id);

            if (item == null)
            {
                return NotFound();
            }

            if (item.UserId != CurrentUserId)
            {
                return Unauthorized();
            }

            moneyRepository.DeleteItem(id);

            return Ok();
        }

        [HttpPut]
        [Route("{itemid}/categorize/{categoryid}")]
        public ActionResult AddItemToCategory(int itemid, int categoryid)
        {
            var item = moneyRepository.GetItem(itemid);
            var category = moneyRepository.GetCategory(categoryid);

            if (item == null || category == null)
            {
                return NotFound();
            }

            if (item.UserId != CurrentUserId || category.UserId != CurrentUserId)
            {
                return Unauthorized();
            }

            moneyRepository.AddItemToCategory(itemid, categoryid);

            return Ok();
        }
    }
}
