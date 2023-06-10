require('dotenv').config({ path: '../.env' });
const MORALIS_URL = require('../utils/constants/NetworkMapper').NETWORK_MAPPER.moralis_url;
const axios = require('axios');

exports.erc721SalesById = (req, res) => {
    const { address, id, network } = JSON.parse(req.body.body); // Parse information for make API call

    if (network === 'polygon-mumbai') {
        res.status(200).json({
            information: null
        });
    }
    else {
        const params = {
            "chain_id": 'polygon',
            "contract_address": address,
            "token_id": id
        }
        
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'accept' : 'application/json',
                'X-API-KEY' : process.env.MATIC_TRANSPOSE_API_KEY
            } 
        }
    
        // Make use of Transpose API to fetch NFT sales by id
        axios.get("https://api.transpose.io/nft/sales-by-token-id?" + new URLSearchParams(params), options)
        .then(response => {
            res.status(200).json({
                information: response.data
            });
        })
        .catch(err => {
            res.status(400).json({
                information: err
            });
        });
    }
}

exports.erc721TokenLookup = (req, res) => {
    const { address, id, network } = JSON.parse(req.body.body);

    let refinedNetwork = network === 'polygon-mumbai' ? 'mumbai' : network;

    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept' : 'application/json',
            'X-API-KEY' : process.env.MORALIS_MATIC_API_KEY
        } 
    }

    // Get ERC721 Token information by ID
    axios.get(MORALIS_URL + 'nft/' + address + "/" + id + "?chain=" + refinedNetwork + "&format=decimal", options)
    .then(response => {
        res.status(200).json({ 
            information: response.data 
        });
    })
    .catch(err => {
        res.status(400).json({ 
            information: err.response.data.message
        });
    });
}

exports.erc721TokenTransferLookup = (req, res) => {
    const { address, id, network } = JSON.parse(req.body.body);

    let refinedNetwork = network === 'polygon-mumbai' ? 'mumbai' : network;
    const LOOKUP_ENDPOINT = '/transfers';

    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'accept' : 'application/json',
            'X-API-KEY' : process.env.MORALIS_MATIC_API_KEY
        }
    }

    // Get ERC721 Token Transfers information by ID
    axios.get(MORALIS_URL + 'nft/' + address + "/" + id + LOOKUP_ENDPOINT + "?chain=" + refinedNetwork + "&format=decimal&direction=both", options)
    .then(response => {
        res.status(200).json({ 
            information: response.data 
        });
    })
    .catch(err => {
        res.status(400).json({ 
            information: err 
        });
    });
}