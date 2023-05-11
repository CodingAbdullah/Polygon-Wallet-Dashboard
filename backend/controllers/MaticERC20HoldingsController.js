require('dotenv').config({ path: '../.env'});
const axios = require('axios');
const MORALIS_URL = require('../utils/constants/NetworkMapper').NETWORK_MAPPER.moralis_url;

exports.getERC20Holdings = (req, res) => { 
    const { address, network } = JSON.parse(req.body.body); // Get address for request to Moralis

    let refinedNetwork = network === 'polygon-mumbai' ? 'mumbai' : network; // Filter network based on name and remove hashes

    // Pass in API key for backend request
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept' : 'application/json',
            'X-API-KEY' : process.env.MORALIS_MATIC_API_KEY
        } 
    }

    axios.get(MORALIS_URL + address + '/erc20?chain=' + refinedNetwork, options) // Pass in address and chain values
    .then(response => {
        res.status(200).json({
            holdings: response.data
        });
    })
    .catch(err => {
        res.status(400).json({
            information: err
        });
    });
}   

exports.getERC20Transfers = (req, res) => { 
    const { address, network } = JSON.parse(req.body.body); // Get address for request to Moralis

    let refinedNetwork = network === 'polygon-mumbai' ? 'mumbai' : network; // Filter network based on name and remove hashes

    // Pass in API key for backend request
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept' : 'application/json',
            'X-API-KEY' : process.env.MORALIS_MATIC_API_KEY
        } 
    }

    // ERC20 Holdings for an account
    axios.get(MORALIS_URL + address + '/erc20/transfers?chain=' + refinedNetwork + '&format=decimal&direction=both', options) // Pass in address and chain values
    .then(response => {
        res.status(200).json({
            transfers: response.data
        });
    })
    .catch(err => {
        res.status(400).json({
            information: err
        });
    });
}   