const express = require("express");
const router = express.Router();
const MaticPriceController = require('../controllers/MaticPriceController');

// Gas Price Calculator
router.get("/get-matic-price", MaticPriceController.getMaticPrice);

module.exports = router;