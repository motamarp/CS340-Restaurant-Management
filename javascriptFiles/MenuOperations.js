import { supabase } from './supabaseConfig.js';

export const MenuOperations = {
    // Get all menu items by category
    getByCategory: async (categoryName) => {
        const { data, error } = await supabase
            .from('MenuItems')
            .select(`
                itemID,
                itemName, 
                price, 
                availability,
                Categories (categoryName)
            `)
            .eq('Categories.categoryName', categoryName)
            .order('itemName', { ascending: true });

        if (error) throw new Error(`Menu items fetch failed: ${error.message}`);
        return data;
    },

    // Add new menu item
    addItem: async (itemData) => {
        const { data, error } = await supabase
            .from('MenuItems')
            .insert([itemData])
            .select();

        if (error) throw new Error(`Item creation failed: ${error.message}`);
        return data[0];
    },

    // Update menu item
    updateItem: async (itemId, updates) => {
        const { data, error } = await supabase
            .from('MenuItems')
            .update(updates)
            .eq('itemID', itemId)
            .select();

        if (error) throw new Error(`Item update failed: ${error.message}`);
        return data[0];
    },

    // Toggle item availability
    toggleAvailability: async (itemId, currentStatus) => {
        return await MenuOperations.updateItem(itemId, {
            availability: !currentStatus
        });
    }
};