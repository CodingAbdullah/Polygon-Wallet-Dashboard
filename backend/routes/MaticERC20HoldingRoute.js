const express = require("express");
const router = express.Router();
const MaticERC20HoldingController = require("../controllers/MaticERC20HoldingsController");

// Add routes to access ERC20 Holdings/Transfers endpoints
router.post("/matic-erc20-holdings", MaticERC20HoldingController.getERC20Holdings);
router.post("/matic-erc20-transfers", MaticERC20HoldingController.getERC20Transfers);

module.exports = router;