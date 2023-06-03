import { ERC721CollectionSalesInformationType } from '../../utils/types/ERC721CollectionSalesInformationType';

const ERC721CollectionSalesInfoTable = (props: { data: ERC721CollectionSalesInformationType }) => {
    const { data } = props;

    // Retrieve recent sales from the Matic NFT collection
    return (
        <div className="p-3" style={{ overflowX: 'scroll', paddingBottom: '2rem' }}>
            <table style={{border: '1px solid black'}}>
                <thead style={{border: '1px solid black'}}>
                <tr style={{border: '1px solid black'}}>
                    <th style={{border: '1px solid black'}} scope="col">Buyer</th>
                    <th style={{border: '1px solid black'}} scope="col">Seller</th>
                    <th style={{border: '1px solid black'}} scope="col">Token Address</th>
                    <th style={{border: '1px solid black'}} scope="col">Token Id(s)</th>
                    <th style={{border: '1px solid black'}} scope="col">Price</th>
                    <th style={{border: '1px solid black'}} scope="col">Time</th>
                </tr>
                </thead>
                <tbody>
                    {
                        data.result.map((record, key) => {
                            let ids = ''; // Data manipulation for display
                            if (record.token_ids.length > 1){
                                for (var i = 0 ; i < record.token_ids.length; i++){
                                    ids += record.token_ids + ", ";
                                }
                                ids = ids.substring(0, ids.length - 2); // Remove the delimiter and space at the end
                            }
                            else {
                                ids = record.token_ids[0]; // Else, keep id as is
                            }
                            return (
                                <tr style={{border: '1px solid black'}}>
                                    <td style={{border: '1px solid black', fontSize: '10.5px'}}>{record.buyer_address}</td>
                                    <td style={{border: '1px solid black', fontSize: '10.5px'}}>{record.seller_address}</td>
                                    <td style={{border: '1px solid black', fontSize: '10.5px'}}>{record.token_address}</td>
                                    <td style={{border: '1px solid black', fontSize: '10.5px'}}>{ids}</td>
                                    <td style={{border: '1px solid black', fontSize: '10.5px'}}>{(Number(record.price)*(1/1000000000000000000)).toPrecision(4)} ETH</td>
                                    <td style={{border: '1px solid black', fontSize: '10.5px'}}>{record.block_timestamp.split("Z")[0]}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ERC721CollectionSalesInfoTable;