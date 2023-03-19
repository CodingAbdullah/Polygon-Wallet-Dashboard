import React, { FC, FormEvent, useState }from 'react';
import Alert from '../Alert/Alert';
import NetworkSelector from '../NetworkSelector/NetworkSelector';
import { useNavigate } from 'react-router';
import axios from 'axios';

const ERC20TokenHoldingsPage: FC = () => {

    const [walletAddress, updateWalletAddress] = useState("");
    const [setAlert, updateAlert] = useState(false);

    const [isEmpty, updateEmptyAlert] = useState(false);
    const [ERC20Holdings, updateERC20Holdings] = useState({
        information: null
    });

    const [ERC20Transfers, updateERC20Transfers] = useState({
        information: null
    });

    const navigate = useNavigate();

    const NODE_SERVER_URL = "http://localhost:5000";
    const ERC20TOKEN_ENDPOINT = '/address-erc20-holdings';

    const ERC20TOKENTRANSFERS_ENDPOINT = '/address-erc20-transfers';

    const [networkID, updateNetworkID] = useState('eth'); // Network selector set to default value

    const updateNetworkHandler = (e: FormEvent<HTMLFormElement>) => {
      //  updateNetworkID(e.target.value);
    }

    const clearHandler = () => {
        updateERC20Holdings((prevState) => { // Removing information, when invalid address is added
            return {
                ...prevState,
                information: null
            }
        });
        updateERC20Transfers((prevState) => {
            return {
                ...prevState,
                information: null
            }
        });
    }

    const walletHandler = (e: FormEvent<HTMLFormElement>) => {
        
    } 

    if (isEmpty || setAlert) {
        return (
            <div className="erc-721-token-page">
                <main role="main">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h2>ERC20 Token Holdings</h2>
                    </div>
                    { setAlert ? <Alert type="danger" /> : null }
                    { isEmpty ? <Alert type="warning" /> : null }
                    <div className="jumbotron">
                        <div className="container">
                            <form onSubmit={ walletHandler }>
                                <label style={{ marginRight: '0.5rem' }}>Enter Wallet Address (ERC20 token balances/transfers in this wallet will be displayed (100 Recent):</label>
                                <input type="text" onChange={ e => updateWalletAddress(e.target.value) } placeholder="Enter here" required />
                                <br />
                                <NetworkSelector />
                                <button style={{ marginTop: '2rem' }} type="submit" className="btn btn-success">Check Balances</button>
                            </form>
                            <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                            <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning' onClick={ () => { updateAlert(false); updateEmptyAlert(false); updateERC20Holdings((prevState) => { return { ...prevState, information: null }}); updateERC20Transfers((prevState) => { return { ...prevState, information: null }} )}}>Clear</button>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
    else {
        return (
                <div className="erc-721-token-page" style={{ textAlign: 'center' }}>
                    <main role="main" className="p-3">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h2>ERC20 Token Holdings</h2>
                        </div>
                        <div className="jumbotron">
                            <div className="container bg-light p-3">
                                <form onSubmit={ walletHandler }>
                                    <label style={{ marginRight: '0.5rem' }}>Enter <b>Wallet Address</b> for <b>ERC20</b> Token Holdings [ERC20 token balances/transfers in this wallet will be displayed (100 Recent)]: </label>
                                    <input type="text" onChange={ e => updateWalletAddress(e.target.value) } placeholder="Enter here" required />
                                    <br />
                                    <NetworkSelector  />
                                    <button style={{ marginTop: '2rem' }} type="submit" className="btn btn-success">Check Balances</button>
                                </form>
                                <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                                <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning' onClick={ () => { updateAlert(false); updateEmptyAlert(false); updateERC20Holdings((prevState) => { return { ...prevState, information: null }} ); updateERC20Transfers((prevState) => { return { ...prevState, information: null }} )}}>Clear</button>
                            </div>
                        </div> 
                    </main>
                </div>
        )
    }
}

export default ERC20TokenHoldingsPage;