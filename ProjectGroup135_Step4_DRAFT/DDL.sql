-- Disabling checks & autocommit 
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

DROP PROCEDURE IF EXISTS sp_resetDB;

DELIMITER $$

CREATE PROCEDURE sp_resetDB()
BEGIN

DROP TABLE IF EXISTS TransactionDetails;
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS MenuItems;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Employees;

-- Customers Table
CREATE TABLE Customers (
    customerID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    joinDate DATE NOT NULL
);

-- Employees Table
CREATE TABLE Employees (
    employeeID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role ENUM('Waiter', 'Cashier', 'Cook', 'Delivery') NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hireDate DATE NOT NULL
);

-- Categories Table
CREATE TABLE Categories (
    categoryID INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(50) NOT NULL UNIQUE
);

-- MenuItems Table
CREATE TABLE MenuItems (
    itemID INT AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(100) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    availability TINYINT(1) NOT NULL,
    categoryID INT NOT NULL,
    FOREIGN KEY (categoryID) REFERENCES Categories(categoryID) ON DELETE RESTRICT
);

-- Transactions Table
CREATE TABLE Transactions (
    transactionID INT AUTO_INCREMENT PRIMARY KEY,
    transactionDate DATETIME NOT NULL,
    transactionType ENUM('Dine-in', 'Takeout', 'Delivery') NOT NULL,
    totalAmount DECIMAL(8,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    customerID INT NOT NULL,
    employeeID INT NOT NULL,
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE,
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID) ON DELETE CASCADE
);

-- TransactionDetails Junction Table
CREATE TABLE TransactionDetails (
    transactionItemID INT AUTO_INCREMENT PRIMARY KEY,
    transactionID INT NOT NULL,
    itemID INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (transactionID) REFERENCES Transactions(transactionID) ON DELETE CASCADE,
    FOREIGN KEY (itemID) REFERENCES MenuItems(itemID) ON DELETE CASCADE
);

-- Sample Data Inserts

-- Categories
INSERT INTO Categories (categoryName) VALUES
('Appetizer'),
('Main Course'),
('Drink'),
('Dessert');

-- Customers
INSERT INTO Customers (name, email, phone, joinDate) VALUES
('Alice Thompson', 'alice@example.com', '555-1234', '2024-03-15'),
('Bob Martinez', 'bob.m@example.com', '555-5678', '2023-11-22'),
('Carol Liu', 'carol.liu@example.com', NULL, '2025-01-05');

-- Employees
INSERT INTO Employees (name, role, email, hireDate) VALUES
('Daniel Kim', 'Waiter', 'daniel.kim@example.com', '2022-06-01'),
('Emma Davis', 'Cashier', 'emma.davis@example.com', '2023-02-18');

-- MenuItems
INSERT INTO MenuItems (itemName, price, availability, categoryID) VALUES
('Cheeseburger', 8.99, 1, 2),
('Caesar Salad', 5.99, 1, 1),
('Chocolate Cake', 4.50, 1, 4),
('Iced Tea', 2.00, 1, 3);

-- Transactions
INSERT INTO Transactions (transactionDate, transactionType, totalAmount, customerID, employeeID) VALUES
('2025-04-30 13:45:00', 'Dine-in', 17.48, 1, 1),
('2025-04-30 14:10:00', 'Takeout', 10.99, 2, 2),
('2025-05-01 12:05:00', 'Delivery', 14.99, 3, 1);

-- TransactionDetails
INSERT INTO TransactionDetails (transactionID, itemID, quantity) VALUES
(1, 1, 1),
(1, 4, 1),
(2, 2, 1),
(3, 3, 1),
(3, 4, 1);

END $$

DELIMITER ;

-- Re-enabling and committing 
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;