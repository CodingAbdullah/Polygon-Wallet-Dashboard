import { FormEvent, FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '../Alert/Alert';
import axios from 'axios';
import { ERC721LookupType } from '../../utils/types/ERC721LookupType';
import { ERC721TransferLookupType } from '../../utils/types/ERC721LookupTransferType';
import ERC721LookupsInfoTable from '../ERC721LookupsInfoTable/ERC721LookupsInfoTable';
import ERC721TransferLookupsInfoTable from '../ERC721LookupsTransferInfoTable/ERC721LookupsTransferInfoTable';

const ERC721TokenLookupsPage: FC = () => {
    const tokenAddress = useRef<HTMLInputElement>(null); // Initialize ERC721 contract attributes
    const tokenId = useRef<HTMLInputElement>(null);
    const [networkID, updateNetworkID] = useState<string>('polygon'); // Network selector set to default value

    const [alert, updateAlert] = useState(false);
    const [emptyAlert, updateEmptyAlert] = useState(false);

    const [tokenLookupData, updateTokenLookupData] = useState<ERC721LookupType>();
    const [tokenLookupTransferData, updateTokenLookupTransferData] = useState<ERC721TransferLookupType>();

    const navigate = useNavigate();

    const NODE_SERVER_URL = 'http://localhost:5001'; // API endpoints for ERC721 lookups
    const LOOKUP_ENDPOINT = '/matic-erc721-lookup-information';
    const TRANSFER_LOOKUP_ENDPOINT = '/matic-erc721-transfers-lookup';

    const clearHandler = () => {
        updateAlert(false);
        updateEmptyAlert(false);
        updateTokenLookupData(undefined);
        updateTokenLookupTransferData(undefined);
    }

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (tokenAddress.current?.value.length === 42 && tokenAddress.current?.value.substring(0, 2) === '0x' && tokenId.current?.value !== undefined){         
            // Set configuration for request
            let options = {
                method: 'POST',
                body: JSON.stringify({ address: tokenAddress.current!.value, id: tokenId.current!.value, network: networkID }),
                headers: {
                    'content-type': 'application/json'
                }
            }

            axios.post(NODE_SERVER_URL + LOOKUP_ENDPOINT, options) // NFT endpoint for retrieving information related to holdings
            .then(response => {
                updateAlert(false); // Remove alerts if any exist
                updateEmptyAlert(false);
                updateTokenLookupData(response.data.information);
            })
            .catch(() => {
                updateEmptyAlert(true);
                updateAlert(false);
            });

            axios.post(NODE_SERVER_URL + TRANSFER_LOOKUP_ENDPOINT, options)
            .then(response => {
                    if (response.data.information.result.length === 0){
                        updateEmptyAlert(true);
                        updateAlert(false);
                    }
                    else {
                        updateAlert(false); // Remove alerts if any exist
                        updateEmptyAlert(false);
                        updateTokenLookupTransferData(response.data.information);
                    }
            });
        }
        else {
            updateAlert(true); // Set Alert
            updateEmptyAlert(false); // Remove redundant alerts, and empty data
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
             <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h2>ERC721 Token Lookup</h2>
                </div>
                { alert ? <Alert type="danger" /> : null }
                { emptyAlert ? <Alert type="warning" /> : null }
                <div className="jumbotron bg-light p-3">                    
                    <form onSubmit={ formHandler }>
                        <p style={{ marginRight: '0.5rem' }}>Enter <b>ERC721</b> Contract Address & <b>Token ID</b> for Lookup </p>
                        <input style={{ marginTop: '1rem' }} type="text" ref={ tokenAddress } placeholder="Enter ERC721 Contract Address" required />
                        <br />
                        <input style={{ marginTop: '1rem' }} type="number" ref={ tokenId } placeholder="Enter Token ID" required />
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
                        <button style={{ marginTop: '2rem' }} type="submit" className="btn btn-success">Lookup</button>
                    </form>
                    <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                    <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning' onClick={ clearHandler }>Clear</button>
                </div>
            </main>
            { 
                 ( emptyAlert === true || alert === true ) ? null : 
                    <>
                        <main style={{ marginTop: '-3rem' }} className="p-3" role="main">
                                <div>
                                    {
                                        tokenLookupData === undefined ? null :
                                            <>
                                                <main style={{ marginTop: '5rem' }} role="main">
                                                    <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                                        <h3 className="h3">ERC-721 Token Lookup Data</h3>
                                                    </div>
                                                </main>
                                                <ERC721LookupsInfoTable data={ tokenLookupData } />
                                            </>
                                    }
                                </div>
                        </main>
                        <main style={{ marginTop: '2rem' }} className="p-3" role="main">
                            <div>
                                {
                                    tokenLookupTransferData === undefined || tokenLookupTransferData.result.length === 0 ? null :
                                        <>
                                            <main style={{ marginTop: '5rem' }} role="main">
                                                <div style={{ marginTop: '1rem' }} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                                    <h3 className="h3">ERC-721 Token Transfers Lookup</h3>
                                                </div>
                                            </main>
                                            <ERC721TransferLookupsInfoTable data={ tokenLookupTransferData } />
                                        </>
                                }
                            </div>
                        </main>
                    </>
            }
        </div>
    )
}

export default ERC721TokenLookupsPage;