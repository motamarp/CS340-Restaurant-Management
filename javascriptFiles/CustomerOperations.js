import { supabase } from './supabaseConfig.js'

export const CustomerOperations = { // Temp comment
    async addCustomer(customerData) {
        const { data, error } = await supabase
            .from('customers')
            .insert([{
                ...customerData,
                joindate: new Date().toISOString()
            }])
            .select()
        
        if (error) throw error
        return data[0]
    },

    async getAllCustomers() {
        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .order('customerid', { ascending: true })
        
        if (error) throw error
        return data
    },

    async getCustomer(customerId) {
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('customerid', customerId)
        .single()
    
    if (error) throw error
    return data
    },

    async deleteCustomer(customerId) {
        const { error } = await supabase
            .from('customers')
            .delete()
            .eq('customerid', customerId)
        
        if (error) throw error
        return true
    },

    async updateCustomer(customerId, updates) {
    // If email is being changed, verify it doesn't exist
    if (updates.email) {
        const { data: existing, error } = await supabase
            .from('customers')
            .select('customerid')
            .eq('email', updates.email)
            .neq('customerid', customerId)
            .maybeSingle();
        
        if (error) throw error;
        if (existing) {
            throw new Error('Email already in use by another customer');
        }
    }

    // Perform normal update
    const { data, error } = await supabase
        .from('customers')
        .update(updates)
        .eq('customerid', customerId)
        .select();
    
    if (error) throw error;
        return data[0];
    }

}