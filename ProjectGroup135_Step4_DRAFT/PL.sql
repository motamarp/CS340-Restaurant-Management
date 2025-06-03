DELIMITER $$

-- Deletes transaction based on ID
CREATE PROCEDURE sp_deleteTransaction(IN txnID INT)
BEGIN
    DELETE FROM Transactions WHERE transactionID = txnID;
END $$

DELIMITER ;