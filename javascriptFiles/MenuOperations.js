import { supabase } from './supabaseConfig.js';

export const MenuOperations = {
  // Get all menu items sorted by ID
  async getAllMenuItems() {
    try {
      const { data, error } = await supabase
        .from('menuitems')
        .select('*')
        .order('itemid', { ascending: true });  // Changed from menuid to itemid
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching menu items:', error.message);
      throw error;
    }
  },

  // Get a single menu item by ID
  async getMenuItem(itemId) {  // Changed parameter name from menuId to itemId
    try {
      const { data, error } = await supabase
        .from('menuitems')
        .select('*')
        .eq('itemid', itemId)  // Changed from menuid to itemid
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching menu item ${itemId}:`, error.message);
      throw error;
    }
  },

  // Add a new menu item
  async addMenuItem(menuData) {
    try {
      const { data, error } = await supabase
        .from('menuitems')
        .insert([{
          itemname: menuData.itemname,
          price: menuData.price,
          availability: menuData.availability,
          categoryid: menuData.categoryid
        }]);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding menu item:', error.message);
      throw error;
    }
  },

  // Update an existing menu item
  async updateMenuItem(itemId, menuData) {  // Changed parameter name from menuId to itemId
    try {
      const { data, error } = await supabase
        .from('menuitems')
        .update({
          itemname: menuData.itemname,
          price: menuData.price,
          availability: menuData.availability,
          categoryid: menuData.categoryid
        })
        .eq('itemid', itemId);  // Changed from menuid to itemid
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error updating menu item ${itemId}:`, error.message);
      throw error;
    }
  },

  // Delete a menu item
  async deleteMenuItem(itemId) {  // Changed parameter name from menuId to itemId
    try {
      const { data, error } = await supabase
        .from('menuitems')
        .delete()
        .eq('itemid', itemId);  // Changed from menuid to itemid
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error deleting menu item ${itemId}:`, error.message);
      throw error;
    }
  }
};