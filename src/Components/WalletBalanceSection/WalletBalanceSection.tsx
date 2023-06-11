import { WalletBalanceType } from "../../utils/types/WalletBalanceType";

const WalletBalanceSection = ( props: { data: WalletBalanceType, address: string }) => {
    const { data, address } = props;

    return (
        <div className="wallet-token-analytics-page p-3">
            <main role="main" className="pt-5">
                <div className="jumbotron">
                    <h3>Account: { address }</h3>
                    <h5>MATIC Balance: { (Number(data!.balanceInformation.result)/1000000000000000000).toFixed(4) } MATIC (@ ${ data!.maticPrice.toFixed(2) } USD/MATIC )</h5>
                    <h6>Amount in USD: ${ (( Number(data!.balanceInformation.result)/1000000000000000000 )*( data!.maticPrice )).toFixed(2) } USD</h6>
                </div>
            </main>
        </div>
    )
}

export default WalletBalanceSection;