import { FC, FormEvent, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Alert from '../Alert/Alert';
import { PriceType } from '../../utils/types/PriceType';
import { WalletTransactionType } from '../../utils/types/WalletTransactionType';
import { ERC20HoldingType } from '../../utils/types/ERC20HoldingType';
import { ERC721HoldingType } from '../../utils/types/ERC721HoldingType';

const WalletInformationPage: FC = () => {
    const [setAlert, updateAlert] = useState<boolean>(false);
    const [amount, updateAmount] = useState<number>(-1);
    const [ethPrice, updateEthPrice] = useState<PriceType>();
    const [maticPrice, updateMaticPrice] = useState<PriceType>();
    const [transactions, updateTransactions] = useState<WalletTransactionType>();
    const [ERC20Holdings, updateERC20Holdings] = useState<ERC20HoldingType>();
    const [ERC721Holdings, updateERC721Holdings] = useState<ERC721HoldingType>();

    const networkID = useRef<HTMLInputElement>(null);
    const walletAddress = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    // Endpoints and URLs
    const NODE_SERVER_URL = 'http://localhost:5001';
    const COIN_GECKO_URL = "https://api.coingecko.com/api/v3";

    const MATIC_ADDRESS_DETAILS_ENDPOINT = "/get-matic-wallet-information";
    const MATIC_ADDRESS_TRANSACTIONS_ENDPOINT = '/get-matic-wallet-transactions';
    const MATIC_ADDRESS_ERC20_HOLDINGS_ENDPOINT = "/get-matic-wallet-erc20-holdings";
    const MATIC_ADDRESS_ERC721_HOLDINGS_ENDPOINT = "/get-matic-wallet-erc721-holdings";

    const alertHandler = () => { 
        // Clear data upon error
        updateAmount(-1);
        updateEthPrice(undefined);
        updateMaticPrice(undefined);
        updateTransactions(undefined);
        updateERC20Holdings(undefined);
        updateERC721Holdings(undefined);
    }

    const clearHandler = () => {
        // Clear values upon User clear button selection
        updateAmount(-1);
        updateEthPrice(undefined);
        updateMaticPrice(undefined);
        updateTransactions(undefined);
        updateERC20Holdings(undefined);
        updateERC721Holdings(undefined);
        updateAlert(false);
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
                                <input ref={ walletAddress } type='text' placeholder='Enter Address Here'></input>
                                <br />
                                <label style={{ marginTop: '3rem' }}>
                                    <p style={{ marginBottom: '0.5rem' }}>Network Selector (<b>mainnet</b> by default)</p>
                                </label>
                                <div style={{ marginLeft: 'auto', marginRight: 'auto', width: "15%" }}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" ref={ networkID } name="polygon" value="polygon" />
                                        <label className="form-check-label">
                                            Polygon
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" ref={ networkID } name="polygon-mumbai" value="polygon-mumbai" />
                                        <label className="form-check-label">
                                            Polygon Mumbai
                                        </label>
                                    </div>
                                </div>                                 
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
