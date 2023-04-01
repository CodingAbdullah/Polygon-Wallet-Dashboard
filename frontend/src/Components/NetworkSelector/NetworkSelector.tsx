import './NetworkSelector.css';

const NetworkSelector = (props: { maticNetwork: Function }) => {
    const { maticNetwork } = props;

    // Add options for Mainnet and Polygon's own testnet
    let optionsValue = null;
    optionsValue = (
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: "50%" }}>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="exampleRadios" value="option2" />
                <label className="form-check-label">
                    Polygon
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                <label className="form-check-label">
                    Polygon Mumbai
                </label>
            </div>
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