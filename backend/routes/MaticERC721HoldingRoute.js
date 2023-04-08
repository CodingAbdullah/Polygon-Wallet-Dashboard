const express = require("express");
const router = express.Router();
const MaticERC721HoldingsController = require("../controllers/MaticERC721HoldingsController");

// Add routes to access ERC20 Holdings/Transfers endpoints
router.post("/matic-erc721-holdings", MaticERC721HoldingsController.getAddressTokenHoldings);
router.post("/matic-erc721-transfers", MaticERC721HoldingsController.getAddressTokenTransfers);

module.exports = router;