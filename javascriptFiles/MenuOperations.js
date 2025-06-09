import { supabase } from './supabaseConfig.js';

export const MenuOperations = {
  // Get all menu items sorted by ID
  async getAllMenuItems() {
    try {
      const { data, error } = await supabase
        .from('menuitems')  // Changed from 'menu' to 'menuitems'
        .select('*')
        .order('menuid', { ascending: true });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching menu items:', error.message);
      throw error;
    }
  },

  // Get a single menu item by ID
  async getMenuItem(menuId) {
    try {
      const { data, error } = await supabase
        .from('menuitems')  // Changed from 'menu' to 'menuitems'
        .select('*')
        .eq('menuid', menuId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching menu item ${menuId}:`, error.message);
      throw error;
    }
  },

  // Add a new menu item
  async addMenuItem(menuData) {
    try {
      const { data, error } = await supabase
        .from('menuitems')  // Changed from 'menu' to 'menuitems'
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
  async updateMenuItem(menuId, menuData) {
    try {
      const { data, error } = await supabase
        .from('menuitems')  // Changed from 'menu' to 'menuitems'
        .update({
          itemname: menuData.itemname,
          price: menuData.price,
          availability: menuData.availability,
          categoryid: menuData.categoryid
        })
        .eq('menuid', menuId);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error updating menu item ${menuId}:`, error.message);
      throw error;
    }
  },

  // Delete a menu item
  async deleteMenuItem(menuId) {
    try {
      const { data, error } = await supabase
        .from('menuitems')  // Changed from 'menu' to 'menuitems'
        .delete()
        .eq('menuid', menuId);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error deleting menu item ${menuId}:`, error.message);
      throw error;
    }
  }
};