import { supabase } from './supabaseConfig.js';

export const TransactionOperations = {
  // Get all transactions sorted by ID
  async getAllTransactions() {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          transactionid,
          transactiondate,
          totalamount,
          customerid,
          employeeid
        `)
        .order('transactionid', { ascending: true });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      throw error;
    }
  },

  // Get transaction details including menu items
  async getTransactionDetails(transactionId) {
    try {
      // Get the transaction header
      const { data: transaction, error: headerError } = await supabase
        .from('transactions')
        .select('*')
        .eq('transactionid', transactionId)
        .single();

      if (headerError) throw headerError;

      // Get the transaction items
      const { data: items, error: itemsError } = await supabase
        .from('transactiondetails')
        .select(`
          quantity,
          menuitems (itemname, price)
        `)
        .eq('transactionid', transactionId);

      if (itemsError) throw itemsError;

      return {
        ...transaction,
        items: items.map(item => ({
          ...item.menuitems,
          quantity: item.quantity
        }))
      };
    } catch (error) {
      console.error(`Error fetching transaction ${transactionId} details:`, error.message);
      throw error;
    }
  },

  // Delete a transaction and its details
  async deleteTransaction(transactionId) {
    try {
      // First delete the transaction details
      const { error: detailsError } = await supabase
        .from('transactiondetails')
        .delete()
        .eq('transactionid', transactionId);

      if (detailsError) throw detailsError;

      // Then delete the transaction header
      const { data, error } = await supabase
        .from('transactions')
        .delete()
        .eq('transactionid', transactionId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error deleting transaction ${transactionId}:`, error.message);
      throw error;
    }
  },

  // Create a new transaction (you can expand this as needed)
  async createTransaction(transactionData) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          transactiondate: new Date().toISOString(),
          transactiontype: transactionData.type || 'sale',
          totalamount: transactionData.totalAmount,
          customerid: transactionData.customerId,
          employeeid: transactionData.employeeId
        }])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error creating transaction:', error.message);
      throw error;
    }
  }
};