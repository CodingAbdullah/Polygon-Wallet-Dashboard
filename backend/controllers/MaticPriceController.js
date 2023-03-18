require("dotenv").config({ path : '../.env' });
const COINGECKO_URL = require("../utils/constants/NetworkMapper").NETWORK_MAPPER.coingecko_url
const axios = require("axios");

// Get Matic Price Information
exports.getMaticPrice = (req, res) => {
    axios.get(COINGECKO_URL + '/simple/price?ids=matic-network&vs_currencies=usd&include_24hr_change=true')
    .then(response => {
        res.status(200).json({
            priceInformation: response.data
        });
    })
    .catch(err => {
        res.status(400).json({
            error: err
        });
    });
}