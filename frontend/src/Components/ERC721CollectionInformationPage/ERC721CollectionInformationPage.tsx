import { FC, useState, useRef, FormEvent } from 'react';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router';
import { ERC721CollectionInformationType } from '../../utils/types/ERC721CollectionInformationType';
import { ERC721CollectionTransferInformationType } from '../../utils/types/ERC721CollectionTransferInformationType';
import axios from 'axios';

// Adding ERC20 Collection Page for Analytics
const ERC20CollectionInformationPage: FC = () => {
    const [setAlert, updateAlert] = useState<boolean>(false);
    const [emptyAlert, updateEmptyAlert] = useState<boolean>(false);
    const tokenAddress = useRef<HTMLInputElement>(null);
    const [collectionInformation, updateCollectionInformation] = useState<ERC721CollectionInformationType>();
    const [collectionTransfers, updateCollectionTransfers] = useState<ERC721CollectionTransferInformationType>();
    const [collectionAttributes, updateCollectionAttributes] = useState(null);
    const [collectionSales, updateCollectionSales] = useState(null);

    const NODE_SERVER_URL = 'http://localhost:5001';
    const MATIC_ERC721_COLLECTION_INFORMATION_ENDPOINT = '/matic-erc721-collection-information';
    const MATIC_ERC721_COLLECTION_TRANSFERS_ENDPOINT = '/matic-erc721-collection-transfers';
    const MATIC_ERC721_COLLECTION_ATTRIBUTES_ENDPOINT = '/matic-erc721-collection-attributes';
    const MATIC_ERC721_COLLECTION_SALES_ENDPOINT = '/matic-erc721-collection-sales';

    const navigate = useNavigate();
    
    const clearHandler = () => {
        updateAlert(false);
        updateEmptyAlert(false);
        updateCollectionInformation(undefined);
        updateCollectionTransfers(undefined);
        updateCollectionAttributes(null);
        updateCollectionSales(null);
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

        // Fetch ERC721 Collection Information
        axios.post(NODE_SERVER_URL + MATIC_ERC721_COLLECTION_INFORMATION_ENDPOINT, options)
        .then(response => {
            updateCollectionInformation(response.data.information);
        })
        .catch(() => {
            updateAlert(true);
            updateEmptyAlert(false);
        });

        // Fetch ERC721 Collection Transfers Information
        axios.post(NODE_SERVER_URL + MATIC_ERC721_COLLECTION_TRANSFERS_ENDPOINT, options)
        .then(response => {
            // Code for the ERC721 Collection Transfers goes here..
            updateCollectionTransfers(response.data.information);
        })
        .catch(() => {
            updateAlert(true);
            updateEmptyAlert(false);

        });

        // Fetch ERC721 Collection Attributes Information
        axios.post(NODE_SERVER_URL + MATIC_ERC721_COLLECTION_ATTRIBUTES_ENDPOINT, options)
        .then(response => {
            // Code for the ERC721 Collection Attributes goes here..
        })
        .catch(() => {
            updateAlert(true);
            updateEmptyAlert(false);
        });

        // Fetch ERC721 Collection Sales Information
        axios.post(NODE_SERVER_URL + MATIC_ERC721_COLLECTION_SALES_ENDPOINT, options)
        .then(response => {
            // Code for the ERC721 Collection Sales goes here..
        })
        .catch(() => {
            updateAlert(true);
            updateEmptyAlert(false);
        });
    }

    return (
        <div className="erc20-collection-page" style={{ textAlign: 'center' }}>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">ERC721 Token Analytics</h1>
                </div>
                { setAlert ? <Alert type='danger' /> : null }
                <div className="jumbotron bg-light p-3">
                    <div className="container">
                        <p>Enter Contract Address of the <b>ERC721</b> Collection for Additional Information</p>
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