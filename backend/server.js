require("dotenv").config({ path: '.env' });
const MaticGasPriceRoute = require('./routes/MaticGasPriceRoute');
const MaticPriceRoute = require('./routes/MaticPriceRoute');
const MaticERC20HoldingRoute = require('./routes/MaticERC20HoldingRoute');
const MaticERC20CollectionRoute = require('./routes/MaticERC20CollectionRoute');
const MaticERC721CollectionRoute = require('./routes/MaticERC721CollectionRoute');
const MaticWalletStatsRoute = require('./routes/MaticWalletStatsRoute');
const MaticTransactionsRoute = require('./routes/MaticTransactionsRoute');
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

app.use("/", MaticGasPriceRoute);
app.use("/", MaticPriceRoute);
app.use("/", MaticERC20HoldingRoute);
app.use("/", MaticERC20CollectionRoute);
app.use("/", MaticERC721CollectionRoute);
app.use("/", MaticWalletStatsRoute);
app.use("/", MaticTransactionsRoute);