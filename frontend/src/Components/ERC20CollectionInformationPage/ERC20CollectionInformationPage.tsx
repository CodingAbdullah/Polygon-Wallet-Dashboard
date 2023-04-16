import { FC, useState, useRef, FormEvent } from 'react';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router';
import axios from 'axios';

// Adding ERC20 Collection Page for Analytics
const ERC20CollectionInformationPage: FC = () => {
    const [setAlert, updateAlert] = useState<boolean>(false);
    const tokenAddress = useRef<HTMLInputElement>(null);
    const [setPrice, updateERC20Price] = useState(null);
    
    const [ERC20Transfers, updateTransfers] = useState({
        information: null
    });

    const [ERC20Information, updateERC20Information] = useState({
        information: null
    });

    const navigate = useNavigate();

    // Node Server endpoints
    const NODE_SERVER_URL = 'http://localhost:5000';
    const NODE_SERVER_TOKEN_PRICE_ENDPOINT = '/matic-erc20-collection-information';
    const NODE_SERVER_TOKEN_TRANSFER_ENDPOINT = '/matic-erc20-collection-transfers';
    const NODE_MATIC_PRICE_ENDPOINT = '/get-matic-price';

    const clearHandler = () => {
        updateAlert(false);
    }

    const alertHandler = () => {
        updateAlert(true); // Add alerts if any don't exist, and clear all information for analytics
        updateTransfers((prevState) => {
            return {
                ...prevState,
                information: null
            }
        });

        updateERC20Price(null);
        updateERC20Information((prevState) => {
            return {
                ...prevState,
                information: null
            }
        });
    }

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
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

        if (tokenAddress.current!.value.length === 42 && tokenAddress.current!.value.substring(0, 2) === '0x'){
            axios.post(NODE_SERVER_URL + NODE_SERVER_TOKEN_TRANSFER_ENDPOINT, options) // ERC20 endpoint for retrieving information related to transfers
            .then(response => {
                if (response.status !== 200){
                    updateAlert(true);
                    alertHandler();
                }
                else {
                    if (response.status === 200 && response.data.information.result.length === 0){ // If empty, remove information
                        updateAlert(false);
                        alertHandler();
                    }
                    else {
                        updateAlert(false); // Remove alerts if any exist
                        updateTransfers((prevState) => {
                            return {
                                ...prevState,
                                information: response.data.information.result
                            }
                        });
                    }
                }
            })
            .catch(() => {
                alertHandler();
            });

            axios.post(NODE_SERVER_URL + NODE_SERVER_TOKEN_PRICE_ENDPOINT, options) // ERC20 endpoint for retrieving information related to price
                .then(response => {
                    if (response.status !== 200){
                        alertHandler();                    
                    }
                    else {
                        if (response.status === 200 && Object.keys(response.data.information).length === 0){ // If empty, clear price
                            alertHandler();                            
                        }
                        else {
                            updateERC20Price(response.data.information.usdPrice);
                        }
                    }
                })
                .catch(() => {
                    alertHandler();
                });
            
            axios.get(NODE_SERVER_URL + NODE_MATIC_PRICE_ENDPOINT) // Retrieve price of ERC20 coin from coingecko
            .then(response => {
                if (response.status === 200 && Object.keys(response).length > 0) { // Check results to see if they match criteria
                    updateERC20Information((prevState) => {
                        return {
                            ...prevState,
                            information: response.data
                        }
                    })
                }
                else {
                    alertHandler();
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
                    <h1 className="h2">ERC20 Token Analytics</h1>
                </div>
                { setAlert ? <Alert type='danger' /> : null }
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
        </div>
    )
}

export default ERC20CollectionInformationPage;