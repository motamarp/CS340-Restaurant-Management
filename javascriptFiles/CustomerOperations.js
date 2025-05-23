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
    }
};