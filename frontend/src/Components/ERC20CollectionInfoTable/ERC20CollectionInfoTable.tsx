import { ERC20CollectionInformationType } from "../../utils/types/ERC20CollectionInformationType";

// Pass in the array of objects of type ERC20Holding to the data properties of the prop object
const ERC20CollectionInfoTable = (props : { data: ERC20CollectionInformationType }) => {
    const { data } = props;

    return (
        <div className="p-3" style={{ overflowX: 'scroll', paddingBottom: '2rem' }}>
            <table style={{ border: '1px solid black' }}>
                <thead style={{ border: '1px solid black' }}>
                    <tr style={{ border: '1px solid black' }}>
                        <th style={{ border: '1px solid black' }} scope="col">Name</th>
                        <th style={{ border: '1px solid black' }} scope="col">Decimals</th>
                        <th style={{ border: '1px solid black' }} scope="col">Symbol</th>
                        <th style={{ border: '1px solid black' }} scope="col">Address</th>
                        <th style={{ border: '1px solid black' }} scope="col">USD Price</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr style={{ border: '1px solid black' }}>
                        <td style={{ border: '1px solid black', padding: '0.5rem', fontSize: '11px' }}>{ data.tokenName }</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem', fontSize: '11px' }}>{ data.tokenDecimals }</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem', fontSize: '11px' }}>{ data.tokenSymbol }</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem', fontSize: '11px' }}>{ data.tokenAddress }</td>
                        <td style={{ border: '1px solid black', padding: '0.5rem', fontSize: '11px' }}>${ data.usdPrice.toPrecision(2) } USD</td>
                    </tr>    
                </tbody>
            </table>
        </div>
    )
}

export default ERC20CollectionInfoTable;