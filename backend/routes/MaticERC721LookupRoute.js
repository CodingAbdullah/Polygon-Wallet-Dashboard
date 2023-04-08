const express = require("express");
const router = express.Router();
const MaticERC721LookupsController = require("../controllers/MaticERC721LookupsController");

// Add routes to access ERC20 Holdings/Transfers endpoints
router.post("/matic-erc721-sales-by-id", MaticERC721LookupsController.erc721SalesById);
router.post("/matic-erc721-lookup-information", MaticERC721LookupsController.erc721TokenLookup);
router.post("/matic-erc721-transfers-lookup", MaticERC721LookupsController.erc721TokenTransferLookup);

module.exports = router;