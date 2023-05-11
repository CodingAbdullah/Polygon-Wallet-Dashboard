require('dotenv').config({ path: '../.env'});
const MORALIS_URL = require('../utils/constants/NetworkMapper').NETWORK_MAPPER.moralis_url;
const axios = require('axios');
const erc20Endpoint = 'erc20/';

exports.getERC20CollectionInformation = (req, res) => { 
    const { address } = JSON.parse(req.body.body); // Get address for request to Moralis
    
    // Pass in API key for backend request
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept' : 'application/json',
            'X-API-KEY' : process.env.MORALIS_API_KEY
        } 
    }

    // Backend ERC20 Collection endpoint
    axios.get(MORALIS_URL + erc20Endpoint + address + '/price?chain=polygon', options) // Pass in address and chain values
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

exports.getERC20CollectionTransfers = (req, res) => {
    const { address } = JSON.parse(req.body.body); // Get address for request to Moralis
    
    // Pass in API key for backend request
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept' : 'application/json',
            'X-API-KEY' : process.env.MORALIS_API_KEY
        } 
    }

    axios.get(MORALIS_URL + erc20Endpoint + address + '/transfers?chain=polygon', options) // Pass in address and chain values
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