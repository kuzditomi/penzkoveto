using System.Linq;
using PenzKoveto.Repository.Models;
using Penzkoveto.Web.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PenzKoveto.Repository;

namespace Penzkoveto.Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : PenzKovetoControllerBase
    {
        private readonly IMoneyRepository moneyRepository;

        public CategoriesController(IMoneyRepository moneyRepository)
        {
            this.moneyRepository = moneyRepository;
        }

        [HttpGet]
        [Route("")]
        public ActionResult GetCategories()
        {
            var categories = moneyRepository.GetCategories(CurrentUserId)
                .Select(c => new CategoryListItem(c))
                .ToList();

            return Ok(categories);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult GetCategory(int id)
        {
            var category = moneyRepository.GetCategory(id);

            if (category == null)
            {
                return NotFound();
            }

            if (category.UserId != CurrentUserId)
            {
                return Unauthorized();
            }

            var vm = new CategoryListItem(category);

            return Ok(vm);
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult Edit(int id, CategoryEditModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var category = moneyRepository.GetCategory(model.Id);

            if (category == null)
            {
                return NotFound();
            }

            if (category.UserId != CurrentUserId)
            {
                return Unauthorized();
            }

            moneyRepository.UpdateCategory(new Category
            {
                Id = model.Id,
                Name = model.Name,
                Color = model.Color
            });

            return Ok();
        }

        [HttpPost]
        [Route("")]
        public ActionResult Add(CategoryAddModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var category = new Category
            {
                Name = model.Name,
                UserId = CurrentUserId,
                Color = model.Color
            };

            moneyRepository.AddCategory(category);

            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Remove(int id)
        {
            var category = moneyRepository.GetCategory(id);

            if (category == null)
            {
                return NotFound();
            }

            if (category.UserId != CurrentUserId)
            {
                Unauthorized();
            }

            moneyRepository.RemoveCategory(id);

            return Ok();
        }
    }
}