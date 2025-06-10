import { supabase } from './supabaseConfig.js';

// Customer Operations for ID validation
export const CustomerOperations = {
  async getCustomer(customerId) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('customerid')
        .eq('customerid', customerId)
        .single();
      
      if (error) throw error;
      if (!data) throw new Error('Customer not found');
      return data;
    } catch (error) {
      console.error(`Error fetching customer ${customerId}:`, error.message);
      throw error;
    }
  }
};

// Employee Operations for ID validation
export const EmployeeOperations = {
  async getEmployee(employeeId) {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('employeeid')
        .eq('employeeid', employeeId)
        .single();
      
      if (error) throw error;
      if (!data) throw new Error('Employee not found');
      return data;
    } catch (error) {
      console.error(`Error fetching employee ${employeeId}:`, error.message);
      throw error;
    }
  }
};

// Transaction Operations
export const TransactionOperations = {
  // Get all transactions sorted by ID
  async getAllTransactions() {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('transactionid', { ascending: true });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      throw error;
    }
  },

  // Get a single transaction by ID
  async getTransaction(transactionId) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('transactionid', transactionId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching transaction ${transactionId}:`, error.message);
      throw error;
    }
  },

  // Add a new transaction
  async addTransaction(transactionData) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          transactiondate: transactionData.transactiondate,
          transactiontype: transactionData.transactiontype,
          totalamount: transactionData.totalamount,
          customerid: transactionData.customerid,
          employeeid: transactionData.employeeid
        }])
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error adding transaction:', error.message);
      throw error;
    }
  },

  // Update an existing transaction
  async updateTransaction(transactionId, transactionData) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .update({
          transactiondate: transactionData.transactiondate,
          transactiontype: transactionData.transactiontype,
          totalamount: transactionData.totalamount,
          customerid: transactionData.customerid,
          employeeid: transactionData.employeeid
        })
        .eq('transactionid', transactionId)
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error(`Error updating transaction ${transactionId}:`, error.message);
      throw error;
    }
  },

  // Delete a transaction
  async deleteTransaction(transactionId) {
    try {
      // First delete related transaction details
      const { error: detailsError } = await supabase
        .from('transactiondetails')
        .delete()
        .eq('transactionid', transactionId);

      if (detailsError) throw detailsError;

      // Then delete the transaction
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

  // Get transaction details with menu items
  async getTransactionDetails(transactionId) {
    try {
      const { data, error } = await supabase
        .from('transactiondetails')
        .select(`
          quantity,
          menuitems (itemid, itemname, price)
        `)
        .eq('transactionid', transactionId);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching details for transaction ${transactionId}:`, error.message);
      throw error;
    }
  }
};