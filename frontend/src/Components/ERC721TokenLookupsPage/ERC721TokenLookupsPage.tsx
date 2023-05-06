import { FormEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '../Alert/Alert';
import axios from 'axios';

const ERC721TokenLookupsPage: FC = () => {
    const [tokenAddress, updateTokenAddress] = useState(""); // Initialize ERC721 contract attributes
    const [tokenId, updateTokenId] = useState("");    
    const [setAlert, updateAlert] = useState(false);
    const [emptyAlert, updateEmptyAlert] = useState(false);

    const [tokenData, updateTokenData] = useState({
        information: null
    });

    const [tokenTransfers, updateTokenTransfers] = useState({
        information: null
    });
    
    const [tokenRarity, updateTokenRarity] = useState({
        information: null
    });

    const navigate = useNavigate();

    const NODE_SERVER_URL = 'http://localhost:5000'; // API endpoints for ERC721 lookups
    const LOOKUP_ENDPOINT = '/erc721-lookup-by-id';
    const TRANSFER_LOOKUP_ENDPOINT = '/erc721-lookup-transfer-by-id';
    const RARITY_LOOKUP_ENDPOINT = '/erc721-lookup-rarity-by-id';

    const [networkID, updateNetworkID] = useState('matic'); // Network selector set to default value

    const updateNetworkHandler = (e: FormEvent<HTMLButtonElement>) => {
  
    }

    const clearHandler = () => {
    }

    const tokenHandler = (e: FormEvent<HTMLFormElement>) => {

    }

    return (
        <div style={{ textAlign: 'center' }}>
             <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h2>ERC721 Token Lookup</h2>
                </div>
                { setAlert ? <Alert type="danger" /> : null }
                <div className="jumbotron bg-light p-3">                    
                    <form onSubmit={ tokenHandler }>
                        <p style={{ marginRight: '0.5rem' }}>Enter <b>ERC721</b> Contract Address & <b>Token ID</b> for Lookup </p>
                        <input style={{ marginTop: '1rem' }} type="text" onChange={ e => updateTokenAddress(e.target.value) } placeholder="Enter ERC721 Contract Address" required />
                        <br />
                        <input style={{ marginTop: '1rem' }} type="number" onChange={ e => updateTokenId(e.target.value) } placeholder="Enter Token ID" required />
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
                        <button style={{ marginTop: '2rem' }} type="submit" className="btn btn-success">Lookup</button>
                    </form>
                    <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                    <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning'>Clear</button>
                </div>
            </main>
        </div>
    )
}

export default ERC721TokenLookupsPage;