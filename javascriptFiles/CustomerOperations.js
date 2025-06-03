import { supabase } from './supabaseConfig.js'

export const CustomerOperations = {
    async addCustomer(customerData) {
        const { data, error } = await supabase
            .from('Customers')
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
            .from('Customers')
            .select('*')
            .order('joinDate', { ascending: false })
        
        if (error) throw error
        return data
    },

    async getCustomer(customerId) {
    const { data, error } = await supabase
        .from('Customers')
        .select('*')
        .eq('customerID', customerId)
        .single()
    
    if (error) throw error
    return data
    },

    async deleteCustomer(customerId) {
        const { error } = await supabase
            .from('Customers')
            .delete()
            .eq('customerID', customerId)
        
        if (error) throw error
        return true
    },

    async updateCustomer(customerId, updates) {
        const { data, error } = await supabase
            .from('Customers')
            .update(updates)
            .eq('customerID', customerId)
            .select()
        
        if (error) throw error
        return data[0]
    }
}