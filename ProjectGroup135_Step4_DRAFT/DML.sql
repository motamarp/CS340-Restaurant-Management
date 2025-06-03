-- View all menu items by category
DELIMITER //
CREATE PROCEDURE GetMenuItemsByCategory(IN selectedCategory VARCHAR(50))
BEGIN
    SELECT mi.itemName, mi.price, c.categoryName, mi.availability
    FROM MenuItems mi
    JOIN Categories c ON mi.categoryID = c.categoryID
    WHERE c.categoryName = selectedCategory;
END;
//

-- Adds new customer
CREATE PROCEDURE AddCustomer(IN nameInput VARCHAR(100), IN emailInput VARCHAR(100), IN phoneInput VARCHAR(15))
BEGIN
    INSERT INTO Customers (name, email, phone, joinDate)
    VALUES (nameInput, emailInput, phoneInput, CURDATE());
END;
//

-- Adds new transaction
CREATE PROCEDURE AddTransaction(IN transactionTypeInput ENUM('Dine-in', 'Takeout', 'Delivery'), IN totalAmountInput DECIMAL(8,2), IN customerIDInput INT, IN employeeIDInput INT)
BEGIN
    INSERT INTO Transactions (transactionDate, transactionType, totalAmount, customerID, employeeID)
    VALUES (NOW(), transactionTypeInput, totalAmountInput, customerIDInput, employeeIDInput);
END;
//

-- Adds item to transaction
CREATE PROCEDURE AddTransactionItem(IN transactionIDInput INT, IN itemIDInput INT, IN quantityInput INT)
BEGIN
    INSERT INTO TransactionDetails (transactionID, itemID, quantity)
    VALUES (transactionIDInput, itemIDInput, quantityInput);
END;
//

-- Updates menu item availability
CREATE PROCEDURE UpdateAvailability(IN itemIDInput INT, IN availabilityStatus TINYINT)
BEGIN
    UPDATE MenuItems
    SET availability = availabilityStatus
    WHERE itemID = itemIDInput;
END;
//

-- Deletes a transaction (and cascade delete from TransactionDetails)
CREATE PROCEDURE DeleteTransaction(IN transactionIDToDelete INT)
BEGIN
    DELETE FROM Transactions WHERE transactionID = transactionIDToDelete;
END;
//

-- Views all transactions for a customer
CREATE PROCEDURE GetCustomerTransactions(IN customerIDInput INT)
BEGIN
    SELECT t.transactionID, t.transactionDate, t.transactionType, t.totalAmount
    FROM Transactions t
    WHERE t.customerID = customerIDInput;
END;
//

-- Views transaction details and item info
CREATE PROCEDURE GetTransactionDetails(IN transactionIDInput INT)
BEGIN
    SELECT td.quantity, mi.itemName, mi.price
    FROM TransactionDetails td
    JOIN MenuItems mi ON td.itemID = mi.itemID
    WHERE td.transactionID = transactionIDInput;
END;
//

-- Changes employee role
CREATE PROCEDURE UpdateEmployeeRole(IN employeeIDInput INT, IN newRole ENUM('Waiter', 'Cashier', 'Cook', 'Delivery'))
BEGIN
    UPDATE Employees
    SET role = newRole
    WHERE employeeID = employeeIDInput;
END;
//

-- Deletes menu item
CREATE PROCEDURE DeleteMenuItem(IN itemIDToDelete INT)
BEGIN
    DELETE FROM MenuItems WHERE itemID = itemIDToDelete;
END;
//

DELIMITER ;
