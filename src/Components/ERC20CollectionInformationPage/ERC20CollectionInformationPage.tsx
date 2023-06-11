import { FC, useState, useRef, FormEvent } from 'react';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ERC20CollectionInformationType } from '../../utils/types/ERC20CollectionInformationType';
import { ERC20CollectionTransferInformationType } from '../../utils/types/ERC20CollectionTransferInformationType';
import ERC20CollectionInfoTable from '../ERC20CollectionInfoTable/ERC20CollectionInfoTable';
import ERC20CollectionTransferInfoTable from '../ERC20CollectionTransferInfoTable/ERC20CollectionTransferInfoTable';

// Adding ERC20 Collection Page for Analytics
const ERC20CollectionInformationPage: FC = () => {
    const [alert, updateAlert] = useState<boolean>(false);
    const tokenAddress = useRef<HTMLInputElement>(null);
    
    const [ERC20CollectionInformation, updateERC20CollectionInformation] = useState<ERC20CollectionInformationType>();
    const [ERC20CollectionTransfers, updateERC20CollectionTransfers] = useState<ERC20CollectionTransferInformationType>();

    const navigate = useNavigate();

    // Node Server endpoints
    const NODE_SERVER_URL = 'http://localhost:5001';
    const NODE_SERVER_TOKEN_PRICE_ENDPOINT = '/matic-erc20-collection-information';
    const NODE_SERVER_TOKEN_TRANSFER_ENDPOINT = '/matic-erc20-collection-transfers';

    const clearHandler = () => {
        updateAlert(false);
        updateERC20CollectionInformation(undefined);
        updateERC20CollectionTransfers(undefined);
    }

    const alertHandler = () => {
        updateAlert(true); // Add alerts if any don't exist, and clear all information for analytics
        updateERC20CollectionInformation(undefined);
        updateERC20CollectionTransfers(undefined);
    }

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Set options for fetch and flight responses
        const options = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ address : tokenAddress.current!.value }),
            headers: {
                'content-type' : 'application/json', 
                'accept': 'application/json',
            }
        }

        if (tokenAddress.current?.value.length === 42 && tokenAddress.current?.value.substring(0, 2) === '0x'){
            axios.post(NODE_SERVER_URL + NODE_SERVER_TOKEN_TRANSFER_ENDPOINT, options) // ERC20 endpoint for retrieving information related to transfers
            .then(response => {
                if (response.status === 200 && response.data.information.result.length === 0){ // If empty, remove information
                    updateAlert(false);
                    alertHandler();
                }
                else {
                    updateAlert(false); // Remove alerts if any exist
                    updateERC20CollectionTransfers(response.data.information);
                }
            })
            .catch(() => {
                alertHandler();
            });

            axios.post(NODE_SERVER_URL + NODE_SERVER_TOKEN_PRICE_ENDPOINT, options) // ERC20 endpoint for retrieving information related to price
            .then(response => {
                if (response.status === 200 && Object.keys(response.data.information).length === 0){ // If empty, clear price
                    alertHandler();                            
                }
                else {
                    updateERC20CollectionInformation(response.data.information);
                }
            })
            .catch(() => {
                alertHandler();
            });
        }
        else {
            alertHandler();
        }
    }

    return (
        <div className="erc20-collection-page" style={{ textAlign: 'center' }}>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">ERC20 Collection Information</h1>
                </div>
                { alert ? <Alert type='danger' /> : null }
                <div className="jumbotron bg-light p-3">
                    <div className="container">
                        <p>Enter Contract Address of the <b>ERC20</b> Token for Additional Information</p>
                        <form onSubmit={ formHandler }>
                            <input ref={ tokenAddress } type='text' placeholder='Enter Address Here'></input>
                            <br />
                            <button style={{ marginTop: '2rem' }} type='submit' className='btn btn-success'>Submit</button>
                        </form> 
                        <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                        <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning' onClick={ clearHandler }>Clear</button>
                    </div>  
                </div>
            </main>
            { 
                alert ? null : 
                    <>
                        <main style={{ marginTop: '-3rem' }} className="p-3" role="main">
                                <div>
                                    {
                                        ERC20CollectionInformation === undefined ? null :
                                            <>
                                                <main style={{ marginTop: '5rem' }} role="main">
                                                    <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                                        <h3 className="h3">ERC20 Collection Information</h3>
                                                    </div>
                                                </main>
                                                <ERC20CollectionInfoTable data={ ERC20CollectionInformation } />
                                            </>
                                    }
                                </div>
                        </main>
                        <main style={{ marginTop: '2rem' }} className="p-3" role="main">
                            <div>
                                {
                                    ERC20CollectionTransfers === undefined ? null :
                                        <>
                                            <main style={{ marginTop: '5rem' }} role="main">
                                                <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                                    <h3 className="h3">ERC20 Collection Transfers</h3>
                                                </div>
                                            </main>
                                            <ERC20CollectionTransferInfoTable address={ tokenAddress.current!.value } data={ ERC20CollectionTransfers } />
                                        </>
                                }
                            </div>
                        </main>
                    </>
            }
        </div>
    )
}

export default ERC20CollectionInformationPage;