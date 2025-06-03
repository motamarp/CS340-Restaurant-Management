//import { supabase } from './supabaseConfig.js';
import * as Menu from './MenuOperations.js';
import * as Customers from './CustomerOperations.js';
//import * as Transactions from './TransactionOperations.js';

// Example usage
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load menu items
        const mainCourses = await Menu.getByCategory('Main Course');
        console.log('Main Courses:', mainCourses);

        // Add new customer
        const newCustomer = await Customers.addCustomer({
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '555-7890'
        });
        console.log('New Customer:', newCustomer);

        // Create transaction
        const newTransaction = await Transactions.createTransaction({
            transactionType: 'Dine-in',
            totalAmount: 25.98,
            customerID: newCustomer.customerID,
            employeeID: 1  // Assuming employee with ID 1 exists
        });

        // Add items to transaction
        await Transactions.addTransactionItems(newTransaction.transactionID, [
            { itemID: 1, quantity: 1 },  // Cheeseburger
            { itemID: 3, quantity: 1 }   // Chocolate Cake
        ]);

        console.log('Transaction completed successfully');
    } catch (error) {
        console.error('Application error:', error);
        alert(error.message);
    }
});