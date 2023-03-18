require("dotenv").config({ path: "../.env" });
const hex2dec = require("hex2dec");
const axios = require("axios");
const MATIC_URL = require("../utils/constants/NetworkMapper").NETWORK_MAPPER.matic_url;

// API call for Matic Gas Price
exports.getMaticGasPrice = (req, res) => {
    axios.get(MATIC_URL +'?module=proxy&action=eth_gasPrice&apikey=' + process.env.MATIC_API_KEY)
    .then(response => {
        res.status(200).json({
            time: new Date().toISOString(),
            gasInformation: response.data,
            gasPrice: (hex2dec.hexToDec(response.data.result)/1000000000).toFixed(2) + " Gwei"
        });
    })
    .catch(err => {
        res.status(400).json({
            error: err
        });
    });
}
