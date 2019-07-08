using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PenzKoveto.Repository.Models;

namespace PenzKoveto.Repository
{
    public class MoneyRepository : IMoneyRepository
    {
        private readonly IServiceProvider serviceProvider;

        public MoneyRepository(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public List<Item> GetItems(string userId, ItemsQueryModel query)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var list = context.Items
                    .Where(item => item.UserId == userId);

                if (query.CategoryId.HasValue)
                {
                    list = list.Where(item => item.CategoryId == query.CategoryId);
                }

                return list.OrderByDescending(i => i.Date)
                    .Include(i => i.Category)
                    .ToList();
            }
        }

        public List<Item> GetItems(string userId, DateTime from, DateTime to)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var list = context.Items
                    .Where(i => i.UserId == userId)
                    .Where(i => i.Date >= from && i.Date < to)
                    .OrderByDescending(i => i.Date)
                    .Include(i => i.Category)
                    .ToList();

                return list;
            }
        }

        public List<Item> GetUncategorizedItems(string userId)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var list = context.Items
                    .Where(i => i.UserId == userId && i.CategoryId == null)
                    .OrderByDescending(i => i.Date)
                    .ToList();

                return list;
            }
        }

        public Item GetItem(int id)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var item = context.Items
                    .Include(i => i.Category)
                    .FirstOrDefault(i => i.Id == id);

                return item;
            }
        }

        public void AddItem(Item item)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                context.Items.Add(item);
                context.SaveChanges();
            }
        }


        public void UpdateItem(Item from)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var item = context.Items.FirstOrDefault(i => i.Id == from.Id);
                if (item == null)
                {
                    // TODO: HIBA
                    return;
                }

                item.Name = from.Name;
                item.CategoryId = from.CategoryId;
                item.Cost = from.Cost;
                item.Type = from.Type;

                context.SaveChanges();
            }
        }

        public void DeleteItem(int id)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var item = context.Items.FirstOrDefault(i => i.Id == id);
                if (item == null)
                {
                    // TODO: HIBA
                    return;
                }

                context.Items.Remove(item);
                context.SaveChanges();
            }
        }

        public void AddItemToCategory(int itemId, int categoryId)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var item = context.Items.FirstOrDefault(i => i.Id == itemId);
                if (item == null)
                {
                    // TODO: HIBA
                    return;
                }

                item.CategoryId = categoryId;
                context.SaveChanges();
            }
        }


        public Category GetCategory(int id)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var category = context.Categories.FirstOrDefault(i => i.Id == id);
                if (category == null)
                {
                    // TODO: HIBA
                    return null;
                }

                return category;
            }
        }

        public List<Category> GetCategories(string userId)
        {

            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var categories = context.Categories.Where(c => c.UserId == userId).ToList();
                return categories;
            }
        }

        public void AddCategory(Category category)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                context.Categories.Add(category);
                context.SaveChanges();
            }
        }


        public void UpdateCategory(Category from)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var category = context.Categories.FirstOrDefault(c => c.Id == from.Id);
                if (category == null)
                {
                    //TODO: hiba
                    return;
                }

                category.Name = from.Name;
                category.Color = from.Color;

                context.SaveChanges();
            }
        }

        public void RemoveCategory(int id)
        {
            using (var context = serviceProvider.GetService<MoneyContext>())
            {
                var category = context.Categories.FirstOrDefault(c => c.Id == id);
                if (category == null)
                {
                    //TODO: hiba
                    return;
                }

                var items = context.Items.Where(c => c.CategoryId == id);

                foreach (var item in items)
                {
                    item.CategoryId = null;
                }
                context.SaveChanges();

                context.Categories.Remove(category);
                context.SaveChanges();
            }
        }
    }
}
