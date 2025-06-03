import { supabase } from './supabaseConfig.js'

export const CustomerOperations = { // Temp comment
    async addCustomer(customerData) {
        const { data, error } = await supabase
            .from('customers')
            .insert([{
                ...customerData,
                joinDate: new Date().toISOString()
            }])
            .select()
        
        if (error) throw error
        return data[0]
    },

    async getAllCustomers() {
        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .order('joinDate', { ascending: false })
        
        if (error) throw error
        return data
    },

    async getCustomer(customerId) {
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('customerID', customerId)
        .single()
    
    if (error) throw error
    return data
    },

    async deleteCustomer(customerId) {
        const { error } = await supabase
            .from('customers')
            .delete()
            .eq('customerID', customerId)
        
        if (error) throw error
        return true
    },

    async updateCustomer(customerId, updates) {
        const { data, error } = await supabase
            .from('customers')
            .update(updates)
            .eq('customerID', customerId)
            .select()
        
        if (error) throw error
        return data[0]
    },

}
console.log("Supabase connection test:");
console.log("Table list:", await supabase.from('pg_tables').select('*'));