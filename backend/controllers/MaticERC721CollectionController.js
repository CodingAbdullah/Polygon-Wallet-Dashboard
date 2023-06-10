require('dotenv').config({ path: '../.env'});
const MORALIS_URL = require('../utils/constants/NetworkMapper').NETWORK_MAPPER.moralis_url;
const axios = require('axios');

exports.getERC721CollectionData = (req, res) => {
    const { address } = JSON.parse(req.body.body);

    const options = {
        method: 'GET',
        headers: {
            'content-type' : 'application/json', 
            'x-api-key' : process.env.MORALIS_MATIC_API_KEY
        }
    };

    // Run backend request
    axios.get(MORALIS_URL + 'nft/' + address + '?chain=polygon', options)
    .then(response => 
        res.status(200).json({ 
            information: response.data 
        })
    )
    .catch(err => {
        res.status(400).json({ 
            information: err 
        });
    });
}

exports.getERC721CollectionTransfers = (req, res) => {
    const { address } = JSON.parse(req.body.body);
    const TRANSFERS_ENDPOINT = '/transfers?chain=polygon';

    const options = {
        method: 'GET',
        headers: {
            'content-type' : 'application/json',
            'x-api-key' : process.env.MORALIS_MATIC_API_KEY 
        }
    };

    // Run backend request
    axios.get(MORALIS_URL + 'nft/' + address + TRANSFERS_ENDPOINT, options)
    .then(response => 
        res.status(200).json({ 
            information: response.data 
        })
    )
    .catch(err => {
        res.status(400).json({ 
            information: err 
        });
    });
}

exports.getERC721CollectionSales = (req, res) => {
    const { address } = JSON.parse(req.body.body);
    const TRADES_ENDPOINT = '/trades?chain=polygon';

    const options = {
        method: 'GET',
        headers: {
            'content-type' : 'application/json',
            'x-api-key' : process.env.MORALIS_MATIC_API_KEY 
        }
    };

    // Run backend request
    axios.get(MORALIS_URL + 'nft/' + address + TRADES_ENDPOINT, options)
    .then(response => 
        res.status(200).json({ 
            information: response.data 
        })
    )
    .catch(err => {
        res.status(400).json({ 
            information: err 
        });
    });
}

exports.getERC721CollectionAttributes = (req, res) => {
    const { address } = JSON.parse(req.body.body);
    
    // Make use of the axios library and hardcord URL for request, no need to use Alchemy's SDK here
    axios.get("https://polygon-mainnet.g.alchemy.com/nft/v2/" + process.env.MATIC_ALCHEMY_API_KEY + "/summarizeNFTAttributes?contractAddress=" + address)
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