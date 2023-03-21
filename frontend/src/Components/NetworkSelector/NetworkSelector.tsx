import './NetworkSelector.css';

const NetworkSelector = (props: { maticNetwork: Function }) => {
    const { maticNetwork } = props;

    // Add options for Mainnet and Polygon's own testnet
    let optionsValue = null;

    optionsValue = (
        <div className="form-check" style={{ textAlign: 'center' }}>
            <label id='network-label' className="form-check-label">Polygon Mainnet</label>
            <input className="form-check-input" onChange={maticNetwork} name='network-type' type="radio" value="polygon" />
            <label id="network-label" className="form-check-label">Polygon Mumbai Testnet</label>
            <input className="form-check-input" name='network-type' type="radio" value="mumbai" />
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