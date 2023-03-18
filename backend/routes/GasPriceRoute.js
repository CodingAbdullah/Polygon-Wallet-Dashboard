const express = require("express");
const router = express.Router();
const GasPriceController = require('../controllers/GasPriceController');

// Gas Price Calculator
router.get("/get-matic-gas-price", GasPriceController.getMaticGasPrice);

module.exports = router;