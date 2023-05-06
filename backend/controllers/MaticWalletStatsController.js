require('dotenv').config({ path: '../.env'});
const axios = require('axios');
const MORALIS_URL = require('../utils/constants/NetworkMapper').NETWORK_MAPPER.moralis_url;
const MATIC_URL = require('../utils/constants/NetworkMapper').NETWORK_MAPPER.matic_url;
const MATIC_MUMBAI_URL = require('../utils/constants/NetworkMapper').NETWORK_MAPPER.matic_mumbai_url;

const mod = "account";
const action = "balance";
const tag = "latest";
const startBlock = 0;
const endBlock = 99999999;
const page = 1;
const sort = 'desc';

// Everything else from Moralis or Polygon Scan
exports.MaticAddressDetails = (req, res) => {
    const { address, network } = JSON.parse(req.body.body);
        
        if (network === 'polygon') {
            // Gather wallet analytics using API resources and running checks to see if wallet address is valid
            axios.get(MATIC_URL + "?module=" + mod + "&action=" + action + "&address=" + address + "&tag=" + tag + "&apikey=" + process.env.MATIC_API_KEY)
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
        else {
            // Gather wallet analytics using API resources and running checks to see if wallet address is valid
            axios.get(MATIC_MUMBAI_URL + "?module=" + mod + "&action=" + action + "&address=" + address + "&tag=" + tag + "&apikey=" + process.env.MATIC_API_KEY)
            .then(response => 
                res.status(200).json({ 
                    information: response.data 
                })
            )
            .catch(err => 
                res.status(400).json({ 
                    information: err 
                })
            );  
        }
    }

exports.MaticAddressTransactions = (req, res) => {
    const { address, network } = JSON.parse(req.body.body);

    if (network === 'polygon'){
        // Transactions of a particular account, if the address of the particular one entered is valid
        axios.get(MATIC_URL + '?module=' + mod + "&action=txlist&address=" + address + "&startblock=" + startBlock 
        + '&endblock=' + endBlock + "&page=" + page + "&offset=" + 1000 + "&sort=" + sort + "&apikey=" + process.env.MATIC_API_KEY)
        .then(response => 
            res.status(200).json({ 
                information: response.data, 
            })
        )
        .catch(err => 
            res.status(400).json({ 
                information: err 
            })
        );
    }
    else {
        // Transactions of a particular account, if the address of the particular one entered is valid
        axios.get(MATIC_MUMBAI_URL + '?module=' + mod + "&action=txlist&address=" + address + "&startblock=" + startBlock 
        + '&endblock=' + endBlock + "&page=" + page + "&offset=" + 1000 + "&sort=" + sort + "&apikey=" + process.env.MATIC_API_KEY)
        .then(response => 
            res.status(200).json({ 
                information: response.data, 
            })
        )
        .catch(err => {
            res.status(400).json({ 
                information: err 
            });
        });
    }
}

exports.MaticERC20Holdings = (req, res) => {
    const { address, network } = JSON.parse(req.body.body);

    let refinedNetwork = network === 'polygon-mumbai' ? 'mumbai' : network;
    const ERC20TOKEN_ENDPOINT = '/erc20?chain=' + refinedNetwork;

    const options = {
        method: 'GET',
        headers: {
            'content-type' : 'application/json',
            'X-API-KEY' : process.env.MORALIS_MATIC_API_KEY
        }
    }

    // ERC20 endpoint for retrieving information related to holdings
    axios.get(MORALIS_URL + address + ERC20TOKEN_ENDPOINT, options)
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

exports.MaticERC721Holdings = (req, res) => {
    const { address, network } = JSON.parse(req.body.body);
    
    let refinedNetwork = network === 'polygon-mumbai' ? 'mumbai' : network;
    const NFT_ENDPOINT = '/nft?chain=' + refinedNetwork + '&format=decimal';

    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'X-API-KEY': process.env.MORALIS_MATIC_API_KEY
        }
    }

    // ERC721 endpoint for retrieving information related to holdings
    axios.get(MORALIS_URL + address + NFT_ENDPOINT, options)
    .then(response => {
        res.status(200).json({
            information: response.data
        });
    })
    .catch(err => {
        res.status(400).json({
            information: err
        });
    })
}