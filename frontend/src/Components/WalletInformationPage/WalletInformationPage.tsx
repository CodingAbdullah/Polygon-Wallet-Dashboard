import React, { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Alert from '../Alert/Alert';
import NetworkSelector from '../NetworkSelector/NetworkSelector';

const WalletInformationPage: FC = () => {
    const [setAlert, updateAlert] = useState(false);
    const [emptyTransactionAlert, updateTransactionAlert] = useState(false);
    const [emptyERC20Alert, updateERC20Alert] = useState(false);
    const [emptyERC721Alert, updateERC721Alert] = useState(false);
    const [networkID, updateNetworkID] = useState('matic');
    const [setNetworkID, updateSetNetworkID] = useState('matic');
    const [checkComplete, updateCheckComplete] = useState(false);

    const [walletAddress, updateWalletAddress] = useState("");
    const [setWalletAddress, updateSetWalletAddress] = useState("");
    
    const navigate = useNavigate();

    const [amount, updateAmount] = useState(-1);

    const [ethPrice, updateEthPrice] = useState({
        information: null
    });

    const [maticPrice, updateMaticPrice] = useState({
        information: null
    });

    const [transactions, updateTransactions] = useState({
        information: null
    });

    const [ERC20Holdings, updateERC20Holdings] = useState({
        information: null
    });

    const [ERC721Holdings, updateERC721Holdings] = useState({
        information: null
    });

    // Endpoints and URLs
    const NODE_SERVER_URL = 'http://localhost:5000';
    const COIN_GECKO_URL = "https://api.coingecko.com/api/v3";
    const QUERY_STRING_ETHEREUM = "?ids=ethereum&vs_currencies=usd&include_24hr_change=true";
    const QUERY_STRING_MATIC_NETWORK = "?ids=matic-network&vs_currencies=usd&include_24hr_change=true";

    const TRANSACTION_DETAIL_ENDPOINT = "/address-transaction-details";
    const ADDRESS_ERC20HOLDINGS_ENDPOINT = '/address-erc20-holdings';
    const API_ENDPOINT = "/simple/price";
    const ADDRESS_ERC721HOLDINGS_ENDPOINT = "/address-erc721-holdings";
    const ADDRESS_DETAILS_ENDPOINT = "/address-details";

    const alertHandler = () => { // Clear data upon error
        updateAmount(-1);
        updateEthPrice((prevState) => {
            return {
                ...prevState,
                information: null
            }
        });
        updateMaticPrice((prevState) => {
            return {
                ...prevState,
                information: null
            }
        });
        updateTransactions((prevState) => {
            return {
                ...prevState,
                information: null
            }
        });
        updateERC20Holdings((prevState) => {
            return {
                ...prevState,
                information: null
            }
        });
        updateERC721Holdings((prevState) => {
            return {
                ...prevState,
                information: null
            }
        });
    }

    const clearHandler = () => {

    }

    const updateNetworkHandler = (e: FormEvent<HTMLFormElement>) => {
       // updateNetworkID(e.target.value);
    }

    const formHandler = (e: FormEvent<HTMLFormElement>) => {   

    }

    return (
        <div className="wallet-stats" style={{ textAlign: 'center' }}>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h2 className="h2">Wallet Analytics</h2>
                </div>
                { setAlert ? <Alert type='danger' /> : null }
                    <div className="jumbotron">
                        <div className="container bg-light p-3">
                            <p>Enter <b>Wallet Address</b> of your choice for information</p>
                            <form onSubmit={ formHandler }>
                                <input onChange={ e => updateWalletAddress(e.target.value) } type='text' placeholder='Enter Address Here'></input>
                                <br />
                                <NetworkSelector  />
                                <button style={{ marginTop: '2rem' }} type='submit' className='btn btn-success'>Submit</button>
                            </form>
                            <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                            <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning' onClick={ clearHandler }>Clear</button> 
                        </div>
                    </div>  
            </main>
        </div>
    )
}

export default WalletInformationPage;