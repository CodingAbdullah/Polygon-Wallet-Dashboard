import { FC, FormEvent, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Alert from '../Alert/Alert';
import WalletBalanceSection from '../WalletBalanceSection/WalletBalanceSection';
import WalletTransactionsInfoTable from '../WalletTransactionsInfoTable/WalletTransactionsInfoTable';
import WalletInternalTransactionsInfoTable from '../WalletInternalTransactionsInfoTable/WalletInternalTransactionsInfoTable';
import { PriceType } from '../../utils/types/PriceType';
import { WalletTransactionType } from '../../utils/types/WalletTransactionType';
import { WalletInternalTransactionType } from '../../utils/types/InternalTransactionType';
import { ERC20HoldingType } from '../../utils/types/ERC20HoldingType';
import { ERC721HoldingType } from '../../utils/types/ERC721HoldingType';
import { WalletBalanceType } from '../../utils/types/WalletBalanceType';
import ERC721HoldingsInfoTable from '../ERC721HoldingsInfoTable/ERC721HoldingsInfoTable';
import ERC20TokenHoldingsInfoTable from '../ERC20TokenHoldingsInfoTable/ERC20TokenHoldingsInfoTable';

const WalletInformationPage: FC = () => {
    const [setAlert, updateAlert] = useState<boolean>(false);
    const [setEmptyAlert, updateEmptyAlert] = useState<boolean>(false);
    const [amount, updateAmount] = useState<WalletBalanceType>();
    const [ethPrice, updateEthPrice] = useState<PriceType>();
    const [maticPrice, updateMaticPrice] = useState<PriceType>();
    const [transactions, updateTransactions] = useState<WalletTransactionType>();
    const [internalTransactions, updateInternalTransactions] = useState<WalletInternalTransactionType>();
    const [ERC20Holdings, updateERC20Holdings] = useState<ERC20HoldingType>();
    const [ERC721Holdings, updateERC721Holdings] = useState<ERC721HoldingType>();

    const [networkID, updateNetworkID] = useState<string>('polygon');
    const walletAddress = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    // Endpoints and URLs
    const NODE_SERVER_URL = 'http://localhost:5001';
    const COIN_GECKO_URL = "https://api.coingecko.com/api/v3";
    const QUERY_STRING_ETHEREUM = "?ids=ethereum&vs_currencies=usd&include_24hr_change=true";
    const QUERY_STRING_MATIC_NETWORK = "?ids=matic-network&vs_currencies=usd&include_24hr_change=true";

    const MATIC_ADDRESS_DETAILS_ENDPOINT = "/get-matic-wallet-information";
    const MATIC_ADDRESS_TRANSACTIONS_ENDPOINT = '/get-matic-wallet-transactions';
    const MATIC_ADDRESS_INTERNAL_TRANSACTIONS_ENDPOINT = '/get-matic-wallet-internal-transactions';
    const MATIC_ADDRESS_ERC20_HOLDINGS_ENDPOINT = "/get-matic-wallet-erc20-holdings";
    const MATIC_ADDRESS_ERC721_HOLDINGS_ENDPOINT = "/get-matic-wallet-erc721-holdings";

    const alertHandler = () => { 
        // Clear data upon error
        updateAmount(undefined);
        updateEthPrice(undefined);
        updateMaticPrice(undefined);
        updateTransactions(undefined);
        updateERC20Holdings(undefined);
        updateERC721Holdings(undefined);
    }

    const clearHandler = () => {
        // Clear values upon User clear button selection
        updateAmount(undefined);
        updateEthPrice(undefined);
        updateMaticPrice(undefined);
        updateTransactions(undefined);
        updateERC20Holdings(undefined);
        updateERC721Holdings(undefined);
        updateAlert(false);
        updateEmptyAlert(false);
    }

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent abnormal form submission

        if (walletAddress.current?.value.length !== 42 || walletAddress.current?.value.substring(0, 2) !== '0x') {
            updateAlert(true);
        }
        else {
            updateAlert(false);
            
            // Adding Options to Request Body
            let options = {
                method: 'POST',
                body: JSON.stringify({ walletAddress: walletAddress.current?.value }),
                headers: {
                    'content-type' : 'application/json'
                }
            }

            // Fetch Coin Prices and their Respective Price Changes
            axios.get(COIN_GECKO_URL + QUERY_STRING_ETHEREUM)
            .then(response => {
                updateEthPrice(response.data);
            })
            .catch(() => {
                updateAlert(true);
            });

            axios.get(COIN_GECKO_URL + QUERY_STRING_MATIC_NETWORK)
            .then(response => {
                updateMaticPrice(response.data);
            })
            .catch(() => {
                updateAlert(true);
            });

            // Requesting Wallet Information
            axios.post(NODE_SERVER_URL + MATIC_ADDRESS_DETAILS_ENDPOINT, options)
            .then(response => {
                if (response.data.information.result === 0) {
                    updateEmptyAlert(true);
                    updateAlert(false);
                }
                else {
                    updateTransactions(response.data.information);
                    updateEmptyAlert(false);
                    updateAlert(false);
                }
            });

            // Requesting List of Transactions
            axios.post(NODE_SERVER_URL + MATIC_ADDRESS_TRANSACTIONS_ENDPOINT, options)
            .then(response => {
                if (response.data.information.result.length === 0) {
                    updateEmptyAlert(true);
                    updateAlert(false);
                }
                else {
                    updateTransactions(response.data.information);
                    updateEmptyAlert(false);
                    updateAlert(false);
                }
            });

            // Requesting List of Internal Transactions
            axios.post(NODE_SERVER_URL + MATIC_ADDRESS_INTERNAL_TRANSACTIONS_ENDPOINT, options)
            .then(response => {
                if (response.data.information.result.length === 0) {
                    updateEmptyAlert(true);
                    updateAlert(false);
                }
                else {
                    updateInternalTransactions(response.data.information);
                    updateEmptyAlert(false);
                    updateAlert(false);
                }
            });

            // List of Wallet ERC20 Holdings
            axios.post(NODE_SERVER_URL + MATIC_ADDRESS_ERC20_HOLDINGS_ENDPOINT, options)
            .then(response => {
                if (response.data.information.length === 0) {
                    updateEmptyAlert(true);
                    updateAlert(false);
                }
                else {
                    updateERC20Holdings(response.data.information);
                    updateEmptyAlert(false);
                    updateAlert(false);
                }
            });

            // List of Wallet ERC721 Holdings
            axios.post(NODE_SERVER_URL + MATIC_ADDRESS_ERC721_HOLDINGS_ENDPOINT, options)
            .then(response => {
                if (response.data.information.result.length === 0) {
                    updateEmptyAlert(true);
                    updateAlert(false);
                }
                else {
                    updateERC721Holdings(response.data.information);
                    updateEmptyAlert(false);
                    updateAlert(false);
                }
            });
        }
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
                                        <input className="form-check-input" type="radio" onChange={ e => updateNetworkID(e.target.value) } name="polygon" value="polygon" />
                                        <label className="form-check-label">
                                            Polygon
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" onChange={ e => updateNetworkID(e.target.value) } name="polygon" value="polygon-mumbai" />
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
            {
                transactions === undefined || setEmptyAlert || setAlert ? null : 
                <WalletBalanceSection data={ amount! } address={ walletAddress.current!.value } />
            }
            {
                transactions === undefined || setEmptyAlert || setAlert ? null :
                    <>
                        <main style={{ marginTop: '5rem' }} role="main">
                            <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h3 className="h3">Transactions (Limited to 1000)</h3>
                            </div>
                        </main>
                        <WalletTransactionsInfoTable address={ walletAddress.current!.value } data={ transactions! } /> 
                    </>
            }            
            {
                internalTransactions === undefined || setEmptyAlert || setAlert ? null :
                    <>
                        <main style={{ marginTop: '5rem' }} role="main">
                            <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h3 className="h3">Internal Transactions</h3>
                            </div>
                        </main>
                        <WalletInternalTransactionsInfoTable address={ walletAddress.current!.value } data={ internalTransactions! } /> 
                    </>
            }
            {
                ERC20Holdings === undefined || setEmptyAlert || setAlert ? null :
                    <>
                        <main style={{ marginTop: '5rem' }} role="main">
                            <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h3 className="h3">ERC20 Holdings</h3>
                            </div>
                        </main>
                        <ERC20TokenHoldingsInfoTable data={ ERC20Holdings! } /> 
                    </>
            }
            {
                ERC721Holdings === undefined || setEmptyAlert || setAlert ? null :
                    <>
                        <main style={{ marginTop: '5rem' }} role="main">
                            <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h3 className="h3">ERC721 Holdings</h3>
                            </div>
                        </main>
                        <ERC721HoldingsInfoTable data={ ERC721Holdings! } /> 
                    </>
            }
        </div>
    )
}

export default WalletInformationPage;
