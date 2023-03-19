// Setting alerts for empty or invalid wallets
const Alert = (props : { type: string }) => {
    const { type } = props;
    const alertType = type.split('-')[0];
    let message = "";

    switch(type) {
        case "danger":
            message = "You need to enter a valid address!";
            break;
        case "warning":
            message = "Empty wallet! No assets/transactions found!";
            break;
        case "warning-empty-internal":
            message = "No internal transactions found!";
            break;
        case "warning-unavailable-testnet":
            message =  "Mainnet/Testnet data not available for this request";
            break;
        default:
            break;
    }

    return (
        <div className="alert" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '-1rem' }} className={`alert alert-${alertType}`} role="alert">
                { message }
            </div>
        </div>
    )
}

export default Alert;