const express = require("express");
const router = express.Router();
const MaticERC20CollectionController = require("../controllers/MaticERC20CollectionController");

// Add routes to access ERC20 Holdings/Transfers endpoints
router.post("/matic-erc20-collection-information", MaticERC20CollectionController.getERC20CollectionInformation);
router.post("/matic-erc20-collection-transfers", MaticERC20CollectionController.getERC20CollectionTransfers);

module.exports = router;