import { supabase } from './supabaseConfig.js';

export const CustomerOperations = {
    // Add new customer
    addCustomer: async (customerData) => {
        const { data, error } = await supabase
            .from('Customers')
            .insert([{
                ...customerData,
                joinDate: new Date().toISOString()
            }])
            .select();

        if (error) throw new Error(`Customer creation failed: ${error.message}`);
        return data[0];
    },

    // Get customer by ID
    getCustomer: async (customerId) => {
        const { data, error } = await supabase
            .from('Customers')
            .select('*')
            .eq('customerID', customerId)
            .single();

        if (error) throw new Error(`Customer fetch failed: ${error.message}`);
        return data;
    },

    // Search customers by name or email
    searchCustomers: async (searchTerm) => {
        const { data, error } = await supabase
            .from('Customers')
            .select('*')
            .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
            .limit(10);

        if (error) throw new Error(`Customer search failed: ${error.message}`);
        return data;
    },

    // Get all customers
    getAllCustomers: async () => {
        const { data, error } = await supabase
            .from('Customers')
            .select('*')
            .order('joinDate', { ascending: false });

        if (error) throw new Error(`Failed to fetch customers: ${error.message}`);
        return data;
    },

    // Update customer
    updateCustomer: async (customerId, updateData) => {
        const { data, error } = await supabase
            .from('Customers')
            .update(updateData)
            .eq('customerID', customerId)
            .select();

        if (error) throw new Error(`Customer update failed: ${error.message}`);
        return data[0];
    },

    // Delete customer
    deleteCustomer: async (customerId) => {
        const { error } = await supabase
            .from('Customers')
            .delete()
            .eq('customerID', customerId);

        if (error) throw new Error(`Customer deletion failed: ${error.message}`);
        return true;
    }
};