require("dotenv").config({ path: '.env' });
const MaticGasPriceRoute = require('./routes/MaticGasPriceRoute');
const MaticPriceRoute = require('./routes/MaticPriceRoute');
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