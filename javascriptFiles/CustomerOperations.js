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

    // Update customer details
    async updateCustomer(customerId, updates) {
    const { data, error } = await supabase
        .from('customers')  // Make sure this matches your table name
        .update(updates)
        .eq('customerid', customerId)  // Match your ID column name
        .select();
    
    if (error) throw error;
    return data[0];
},

}