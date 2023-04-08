const express = require("express");
const router = express.Router();
const MaticWalletStatsController = require('../controllers/MaticWalletStatsController');

// Waalet Information Routes
router.post("/get-matic-wallet-information", MaticWalletStatsController.MaticAddressDetails);
router.post("/get-matic-wallet-transactions", MaticWalletStatsController.MaticAddressTransactions);
router.post("/get-matic-wallet-erc20-holdings", MaticWalletStatsController.MaticERC20Holdings);
router.post("/get-matic-wallet-erc721-holdings", MaticWalletStatsController.MaticERC721Holdings);

module.exports = router;