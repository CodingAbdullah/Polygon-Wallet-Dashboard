const express = require("express");
const router = express.Router();
const MaticERC721CollectionController = require("../controllers/MaticERC721CollectionController");

// Add routes to access ERC20 Holdings/Transfers endpoints
router.post("/matic-erc721-collection-information", MaticERC721CollectionController.getERC721CollectionData);
router.post("/matic-erc721-collection-transfers", MaticERC721CollectionController.getERC721CollectionTransfers);
router.post("/matic-erc721-collection-attributes", MaticERC721CollectionController.getERC721CollectionAttributes);
router.post("/matic-erc721-collection-sales", MaticERC721CollectionController.getERC721CollectionSales);

module.exports = router;