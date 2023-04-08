require("dotenv").config({ path: '.env' });
const MaticERC20HoldingRoute = require('./routes/MaticERC20HoldingRoute');
const MaticERC20CollectionRoute = require('./routes/MaticERC20CollectionRoute');
const MaticERC721CollectionRoute = require('./routes/MaticERC721CollectionRoute');
const MaticERC721HoldingRoute = require('./routes/MaticERC721HoldingRoute');
const MaticERC721LookupRoute = require("./routes/MaticERC721LookupRoute");
const MaticGasPriceRoute = require('./routes/MaticGasPriceRoute');
const MaticPriceRoute = require('./routes/MaticPriceRoute');
const MaticTransactionsRoute = require('./routes/MaticTransactionsRoute');
const MaticWalletStatsRoute = require('./routes/MaticWalletStatsRoute');
const express = require("express");
const cors = require("cors");
const app = express();

// Spinning up a node server..
app.listen(process.env.PORT || 8080, () => {
    console.log("Listening to PORT " + process.env.PORT || 8080);
});

app.use(cors()); // Cors-enabled server
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use("/", MaticERC20HoldingRoute);
app.use("/", MaticERC20CollectionRoute);
app.use("/", MaticERC721CollectionRoute);
app.use("/", MaticERC721HoldingRoute);
app.use("/", MaticGasPriceRoute);
app.use("/", MaticPriceRoute);
app.use("/", MaticTransactionsRoute);
app.use("/", MaticWalletStatsRoute);
app.use("/", MaticERC721LookupRoute);