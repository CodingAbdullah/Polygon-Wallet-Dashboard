import { FC, useState, useRef, FormEvent } from 'react';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router';
import { ERC721CollectionInformationType } from '../../utils/types/ERC721CollectionInformationType';
import { ERC721CollectionTransferInformationType } from '../../utils/types/ERC721CollectionTransferInformationType';
import { ERC721CollectionAttributesType } from '../../utils/types/ERC721CollectionAttributesType';
import { ERC721CollectionSalesInformationType } from '../../utils/types/ERC721CollectionSalesInformationType';
import ERC721CollectionAttributesInfoTable from '../ERC721CollectionAttributesInfoTable/ERC721CollectionAttributesInfoTable';
import ERC721CollectionInfoTable from '../ERC721CollectionInfoTable/ERC721CollectionInfoTable';
import ERC721CollectionSalesInfoTable from '../ERC721CollectionSalesInfoTable/ERC721CollectionSalesInfoTable';
import ERC721CollectionTransferInfoTable from '../ERC721CollectionTransferInfoTable/ERC721CollectionTransferInfoTable';
import axios from 'axios';

// Adding ERC20 Collection Page for Analytics
const ERC20CollectionInformationPage: FC = () => {
    const NODE_SERVER_URL = 'https://18.221.208.44.nip.io';
    const MATIC_ERC721_COLLECTION_INFORMATION_ENDPOINT = '/matic-erc721-collection-information';
    const MATIC_ERC721_COLLECTION_TRANSFERS_ENDPOINT = '/matic-erc721-collection-transfers';
    const MATIC_ERC721_COLLECTION_ATTRIBUTES_ENDPOINT = '/matic-erc721-collection-attributes';
    const MATIC_ERC721_COLLECTION_SALES_ENDPOINT = '/matic-erc721-collection-sales';

    const [collectionInformation, updateCollectionInformation] = useState<ERC721CollectionInformationType>();
    const [collectionTransfers, updateCollectionTransfers] = useState<ERC721CollectionTransferInformationType>();
    const [collectionAttributes, updateCollectionAttributes] = useState<ERC721CollectionAttributesType>();
    const [collectionSales, updateCollectionSales] = useState<ERC721CollectionSalesInformationType>();
    const [alert, updateAlert] = useState<boolean>(false);
    const tokenAddress = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    
    const clearHandler = () => {
        updateAlert(false);
        updateCollectionInformation(undefined);
        updateCollectionTransfers(undefined);
        updateCollectionAttributes(undefined);
        updateCollectionSales(undefined);
    }

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearHandler();

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
        });

        // Fetch ERC721 Collection Transfers Information
        axios.post(NODE_SERVER_URL + MATIC_ERC721_COLLECTION_TRANSFERS_ENDPOINT, options)
        .then(response => {
            updateCollectionTransfers(response.data.information);
        })
        .catch(() => {
            updateAlert(true);
        });

        // Fetch ERC721 Collection Attributes Information
        axios.post(NODE_SERVER_URL + MATIC_ERC721_COLLECTION_ATTRIBUTES_ENDPOINT, options)
        .then(response => {
            updateCollectionAttributes(response.data.information);
        })
        .catch(() => {
            updateAlert(true);
        });

        // Fetch ERC721 Collection Sales Information
        axios.post(NODE_SERVER_URL + MATIC_ERC721_COLLECTION_SALES_ENDPOINT, options)
        .then(response => {
            updateCollectionSales(response.data.information);
        })
        .catch(() => {
            updateAlert(true);
        });
    }

    return (
        <div className="erc20-collection-page" style={{ textAlign: 'center' }}>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">ERC721 Token Analytics</h1>
                </div>
                { alert ? <Alert type='danger' /> : null }
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
                { 
                    collectionInformation !== undefined && !alert ? 
                        <>
                            <main style={{ marginTop: '3rem', overflowX: 'scroll', paddingBottom: '2rem' }} role="main">
                                <h4>NFT Collection Name: <b>{ collectionInformation!.result.name }</b></h4>
                                <h4>Contract Address: <b>{ tokenAddress.current!.value }</b></h4> 
                                <h4>Total Items: <b>{ collectionInformation!.total }</b></h4> 
                            </main>
                        </> : null
                }
                {
                    collectionInformation !== undefined && !alert ?
                        <>
                            <main style={{ marginTop: '3rem' }} className="p-3" role="main">
                                <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h3 className="h3">Collection Data</h3>
                                </div>
                            </main>
                            <ERC721CollectionInfoTable data={ collectionInformation } />
                        </> : null
                }
                {
                    collectionAttributes !== undefined && !alert ?
                        <>
                            <main style={{ marginTop: '3rem' }} className="p-3" role="main">
                                <>
                                    <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                        <h3 className="h3">Collection Attributes</h3>
                                    </div>
                                </> 
                            </main>
                            <ERC721CollectionAttributesInfoTable data={ collectionAttributes! } />
                        </> : null
                }
                {
                    collectionTransfers !== undefined && !alert ?
                        <>
                            <main style={{ marginTop: '3rem' }} className="p-3" role="main">
                                <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h3 className="h3">Collection Transfer Data</h3>
                                </div>
                            </main>
                            <ERC721CollectionTransferInfoTable data={ collectionTransfers! } />
                        </> : null
                }
                {
                    collectionSales !== undefined && !alert ?
                        <>
                            <main style={{ marginTop: '3rem' }} className="p-3" role="main">
                                <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h3 className="h3">Recent Collection Sales</h3>
                                </div>
                            </main>
                            <ERC721CollectionSalesInfoTable data={ collectionSales! } />
                        </> : null
                }
        </div>
    )
}

export default ERC20CollectionInformationPage;