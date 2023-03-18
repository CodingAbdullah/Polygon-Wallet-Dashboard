const express = require("express");
const router = express.Router();
const MaticGasPriceController = require('../controllers/MaticGasPriceController');

// Gas Price Calculator
router.get("/get-matic-gas-price", MaticGasPriceController.getMaticGasPrice);

module.exports = router;