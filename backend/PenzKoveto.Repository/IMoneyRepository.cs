using System;
using System.Collections.Generic;
using PenzKoveto.Repository.Models;

namespace PenzKoveto.Repository
{
    public interface IMoneyRepository
    {
        // Items
        List<Item> GetItems(string userId);
        List<Item> GetItems(string userId, DateTime from, DateTime to);
        
        List<Item> GetUncategorizedItems(string userId);
        Item GetItem(int id);
        void AddItem(Item item);
        void UpdateItem(Item item);
        void DeleteItem(int id);
        
        // Categories
        List<Category> GetCategories(string userId);
        Category GetCategory(int id);
        void AddCategory(Category category);
        void UpdateCategory(Category category);
        void AddItemToCategory(int itemId, int categoryId);
        void RemoveCategory(int id);
    }
}
