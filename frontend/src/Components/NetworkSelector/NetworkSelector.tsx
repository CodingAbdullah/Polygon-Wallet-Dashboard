import { FC } from 'react';
import './NetworkSelector.css';

const NetworkSelector: FC = () => {
    // Add options for Mainnet and Polygon's own testnet
    let optionsValue = null;

    optionsValue = (
        <div className="form-check">
            <label id='network-label' className="form-check-label">Polygon Mainnet</label>
            <input className="form-check-input" name='network-type' type="radio" value="polygon-mainnet" />
            <label id="network-label" className="form-check-label">Polygon Mumbai Testnet</label>
            <input className="form-check-input" name='network-type' type="radio" value="polygon-mumbai" />
        </div>
    )
    
    return (
        <main role="main">            
            <label style={{ marginTop: '3rem' }}>
                <p style={{ marginBottom: '0.5rem' }}>Network Selector (<b>mainnet</b> by default)</p>
            </label>
            { optionsValue }
        </main>
    )
}

export default NetworkSelector;