require('dotenv').config({ path: '../.env' });
const MATIC_URL = require('../utils/constants/NetworkMapper').NETWORK_MAPPER.matic_url;
const COINGECKO_URL = require('../utils/constants/NetworkMapper').NETWORK_MAPPER.coingecko_url;
const axios = require('axios');

const mod = "account";
const action = "balance";
const API_KEY = process.env.MATIC_API_KEY; // Custom API KEY generated and hidden under .env file
const startBlock = 0;
const endBlock = 99999999;
const page = 1;
const sort = 'desc';

exports.getAddressTransactionBalance = (req, res) => {
    const { address } = JSON.parse(req.body.body);
    
    axios.get(MATIC_URL + "?module=" + mod + "&action=" + action + "&address=" + address + "&apikey=" + API_KEY)
    .then(response => 
        axios.get(COINGECKO_URL + "/simple/price?ids=matic-network&vs_currencies=usd")
        .then(coingeckoInformation => {
            res.status(200).json({
                balanceInformation: response.data,
                maticPrice: coingeckoInformation.data["matic-network"].usd
            });
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        })
    )
    .catch(err => 
        res.status(400).json({ 
            information: err 
        })
    );
}

exports.getAddressTransactionHistory = (req, res) => {
    const { address } = JSON.parse(req.body.body);

    // Gather list of transactions in descending order
    axios.get(MATIC_URL + '?module=' + mod + "&action=txlist&address=" + address + "&startblock=" + startBlock 
    + '&endblock=' + endBlock + "&page=" + page + "&offset=" + 1000 + "&sort=" + sort + "&apikey=" + API_KEY)
    .then(response => {
        res.status(200).json({ 
            information: response.data 
        })
    })
    .catch(err => 
        res.status(400).json({ 
            information: err 
        })
    );
}

exports.getAddressInternalTransactionHistory = (req, res) => {
    const { address } = JSON.parse(req.body.body);

    // Gather data about internal transactions (L2.. bridges, etc)
    axios.get(MATIC_URL + '?module=' + mod + '&action=txlistinternal&address=' + address + '&startblock=' + startBlock
    + '&endblock=' + endBlock + '&page=' + page + '&offset=' + 1000 + '&sort=' + sort + '&apikey=' + API_KEY) 
    .then(response => { 
        res.status(200).json({ 
            information: response.data 
        });
    })
    .catch(err => 
        res.status(400).json({ 
            information: err 
        })
    );
}