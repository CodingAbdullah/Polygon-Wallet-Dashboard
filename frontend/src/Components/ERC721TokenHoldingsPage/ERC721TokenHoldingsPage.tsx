import { FC, FormEvent, useRef, useState } from 'react';
import { useNavigate } from "react-router";
import Alert from '../Alert/Alert';
import axios from 'axios';


const ERC721TokenHoldingsPage: FC = () => {
    // Set up state and hooks
    const [alert, updateAlert] = useState<boolean>(false);
    const [emptyAlert, updateEmptyAlert] = useState<boolean>(false);
    const [networkID, updateNetworkID] = useState<string>('polygon');

    // const [erc721HoldingData, updateERC721HoldingData] = useState<ERC721HoldingType>();
    // const [erc721TransferData, updateERC721TransferData] = useState<ERC721TransferType>();

    const address = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    
    // Clear and Form handlers
    const clearHandler = () => {
        updateAlert(false);
        updateEmptyAlert(false);
        // updateERC721HoldingData(undefined);
        // updateERC721TransferData(undefined);
    }

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Set configuration for request
        let options = {
            method: 'POST',
            body: JSON.stringify({ address: address.current?.value, network: networkID }),
            headers: {
                'content-type': 'application/json'
            }
        }
    }
    
    return (
        <div className='erc-721-token-holdings-page' style={{ textAlign: 'center' }}>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">ERC721 Token Holdings</h1>
                </div>
                { alert ? <Alert type="danger" /> : null }
                { emptyAlert ? <Alert type="warning" /> : null }
                <div className="jumbotron bg-light p-3">
                    <div className="container">
                        <form onSubmit={ (e) => formHandler(e) }>
                            <label>Enter <b>Wallet Address</b> for list of <b>ERC721</b> Holdings and Transfers:</label>
                            <input style={{ marginLeft: '0.5rem' }} ref={address} type='text' placeholder='Enter Wallet Address' />
                            <br />
                            <label style={{ marginTop: '3rem' }}>
                                <p style={{ marginBottom: '0.5rem' }}>Network Selector (<b>mainnet</b> by default)</p>
                            </label>
                            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: "15%" }}>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="polygon" value="polygon" />
                                    <label className="form-check-label">
                                        Polygon
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="polygon-mumbai" value="polygon-mumbai" />
                                    <label className="form-check-label">
                                        Polygon Mumbai
                                    </label>
                                </div>
                            </div>                             
                            <button style={{ marginTop: '1rem' }} type='submit' className='btn btn-success'>View Holdings</button>
                        </form>
                        <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                        <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning' onClick={ clearHandler }>Clear</button> 
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ERC721TokenHoldingsPage;