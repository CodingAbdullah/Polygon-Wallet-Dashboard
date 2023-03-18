import { useEffect, useState } from 'react';
import axios from 'axios';
import { PriceType } from '../../utils/types/PriceType';
import { GasPriceType } from '../../utils/types/GasPriceType';

const MetricsNavbar = () => {
    const [priceInformation, updatePriceInformation] = useState<PriceType>();
    const [gasInformation, updateGasInformation] = useState<GasPriceType>();
    const [alert, updateAlert] = useState<boolean>(false);

    useEffect(() => {       
        const fetchInfo = async () => {
            // Upon render, run API call to collect data using information passed down from parent component, provided it is the mainnet
            const options = {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                }
            }
            try {
                const priceInformation = await axios.get('http://localhost:5001/get-matic-price', options); // Retrieve Price information for Matic                 
                const gasInformation = await axios.get('http://localhost:5001/get-matic-gas-price', options) // Retrive Gas information for Matic
                
                updatePriceInformation(priceInformation.data.priceInformation["matic-network"]);
                updateGasInformation(gasInformation.data);
            }
            catch {
                updateAlert(true);
            }
        }
        fetchInfo();
    }, [])

    if ( priceInformation === undefined || gasInformation === undefined || alert ){
        return <div>Loading...</div>
    }
    else {
        // Adding another Navbar containing price information
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"> 
                                <p style={{ paddingLeft: '1rem', display: 'inline', color: 'white', marginTop: '1rem'}}>Matic Price: <b>{ priceInformation === undefined ? "Loading" : "$" + priceInformation.usd.toFixed(2) }</b></p>
                            </li>
                            <li className="nav-item">
                                <p style={{ paddingLeft: '1rem', display: 'inline', color: 'white' }}>24-Hr % Chg:</p>
                                <p style={{ color: priceInformation.usd_24h_change < 0 ? 'red' : 'lightgreen', marginTop: '1rem', display: 'inline' }}>
                                    <b>{ priceInformation.usd_24h_change > 0 ? " +" + priceInformation.usd_24h_change.toFixed(2) + "%" : " " + priceInformation.usd_24h_change.toFixed(2) + "%" }</b>
                                </p> 
                            </li>
                            <li className="nav-item">
                                <p style={{ paddingLeft: '1rem', display: 'inline', color: 'white' }}>Gas Price:</p>
                                <p style={{ display: 'inline', color: 'white' }}><b>{ " " + gasInformation.gasPrice + " " }</b></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default MetricsNavbar;