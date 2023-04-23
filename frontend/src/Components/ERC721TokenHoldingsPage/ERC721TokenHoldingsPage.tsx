import { FC, FormEvent, useRef, useState } from 'react';
import ERC721HoldingsInfoTable from '../ERC721HoldingsInfoTable/ERC721HoldingsInfoTable';
import ERC721TransfersInfoTable from '../ERC721TransfersInfoTable/ERC721TransfersInfoTable';
import { useNavigate } from "react-router";
import Alert from '../Alert/Alert';
import axios from 'axios';

const ERC721TokenHoldingsPage: FC = () => {
    // Set up state and hooks
    const [alert, updateAlert] = useState<boolean>(false);
    const [emptyAlert, updateEmptyAlert] = useState<boolean>(false);
    const [networkID, updateNetworkID] = useState<string>('polygon');

    const [nftData, updateNFTData] = useState({
        information: null
    });

    const [ERC721Transfers, updateERC721Transfers] = useState({
        information: null
    });

    const NODE_SERVER_URL = "http://localhost:5000"; // Modifying end points for the backend server
    const NFT_ENDPOINT = '/address-erc721-holdings';
    const NFT_TRANSFERS_ENDPOINT = '/address-erc721-transfers';

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

        if (address.current!.value.length === 42 && address.current!.value.substring(0, 2) === '0x'){
            if (networkID === 'kovan' || networkID === 'rinkeby' || networkID === 'ropsten') {
                // Set alerts for networks not available
                updateEmptyAlert(true);
            }
            else {
                axios.post(NODE_SERVER_URL + NFT_ENDPOINT, options) // NFT endpoint for retrieving information related to holdings
                .then(response => {
                    if (response.status !== 200){
                        updateAlert(true);
                        updateEmptyAlert(false);
                        updateNFTData((prevState) => {
                            return {
                                ...prevState,
                                information: null
                            }
                        });
                    }
                    else {
                        if (response.status === 200 && response.data.information.total === 0){ // If empty, display warning
                            updateEmptyAlert(true);
                            updateAlert(false);
                            updateNFTData((prevState) => {
                                return {
                                    ...prevState,
                                    information: null
                                }
                            });
                        }
                        else {
                            updateAlert(false); // Remove alerts if any exist
                            updateEmptyAlert(false);

                            updateNFTData((prevState) => {
                                return {
                                    ...prevState,
                                    information: response.data.information
                                }
                            });
                        }
                    }
                })

                axios.post(NODE_SERVER_URL + NFT_TRANSFERS_ENDPOINT, options)
                .then(response => {
                    if (response.status !== 200){
                        updateERC721Transfers((prevState) => {
                            return {
                                ...prevState,
                                information: null
                            }
                        });
                    }
                    else {
                        if (response.status === 200 && response.data.information.result.length === 0){ // If empty, keep state to null
                            updateERC721Transfers((prevState) => {
                                return {
                                    ...prevState,
                                    information: null
                                }
                            });
                        }
                        else {
                            updateERC721Transfers((prevState) => {
                                return {
                                    ...prevState,
                                    information: response.data.information.result // If data exists, add it to state
                                }
                            });
                        }
                    }
                });
            }
        }
        else {
            updateAlert(true); // Set Alert
            updateEmptyAlert(false); // Remove redundant alerts, and empty data
            clearHandler();
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
            { 
                emptyAlert ? null : 
                    <>
                        <main style={{marginTop: '-3rem'}} className="p-3" role="main">
                                <div>
                                    {
                                        nftData.information === null ? null :
                                            <>
                                                <main style={{ marginTop: '5rem' }} role="main">
                                                    <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                                        <h3 className="h3">ERC-721 Token Holdings</h3>
                                                    </div>
                                                </main>
                                                <ERC721HoldingsInfoTable data={ nftData.information } />
                                            </>
                                    }
                                </div>
                        </main>
                        <main style={{marginTop: '2rem'}} className="p-3" role="main">
                            <div>
                                {
                                    ERC721Transfers.information === null ? null :
                                        <>
                                            <main style={{ marginTop: '5rem' }} role="main">
                                                <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                                    <h3 className="h3">Sample ERC-721 Transfers</h3>
                                                </div>
                                            </main>
                                            <ERC721TransfersInfoTable address={ address.current!.value } data={ ERC721Transfers.information } />
                                        </>
                                }
                            </div>
                        </main>
                    </>
            }
        </div>
    )
}

export default ERC721TokenHoldingsPage;