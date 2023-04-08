const express = require("express");
const router = express.Router();
const MaticTransactionsController = require('../controllers/MaticTransactionsController');

// Waalet Information Routes
router.post("/get-matic-wallet-transactions-balance-information", MaticTransactionsController.getAddressTransactionBalance);
router.post("/get-matic-wallet-transaction-information", MaticTransactionsController.getAddressTransactionHistory);
router.post("/get-matic-wallet-internal-transactions-information", MaticTransactionsController.getAddressInternalTransactionHistory);


module.exports = router;