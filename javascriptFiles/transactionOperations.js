import { supabase } from './supabaseConfig.js';

export const transactionOperations = {
    // Create new transaction
    createTransaction: async (transactionData) => {
        const { data, error } = await supabase
            .from('Transactions')
            .insert([transactionData])
            .select();

        if (error) throw new Error(`Transaction creation failed: ${error.message}`);
        return data[0];
    },

    // Add items to transaction
    addTransactionItems: async (transactionId, items) => {
        const itemsWithTransaction = items.map(item => ({
            transactionID: transactionId,
            itemID: item.itemID,
            quantity: item.quantity
        }));

        const { data, error } = await supabase
            .from('TransactionDetails')
            .insert(itemsWithTransaction)
            .select();

        if (error) throw new Error(`Items addition failed: ${error.message}`);
        return data;
    },

    // Get transaction with details
    getTransaction: async (transactionId) => {
        const { data: transaction, error: transError } = await supabase
            .from('Transactions')
            .select(`
                *,
                Customers (name, email),
                Employees (name, role)
            `)
            .eq('transactionID', transactionId)
            .single();

        if (transError) throw new Error(`Transaction fetch failed: ${transError.message}`);

        const { data: items, error: itemsError } = await supabase
            .from('TransactionDetails')
            .select(`
                quantity,
                MenuItems (itemName, price)
            `)
            .eq('transactionID', transactionId);

        if (itemsError) throw new Error(`Items fetch failed: ${itemsError.message}`);

        return {
            ...transaction,
            items: items.map(i => ({
                ...i.MenuItems,
                quantity: i.quantity
            }))
        };
    }
};
