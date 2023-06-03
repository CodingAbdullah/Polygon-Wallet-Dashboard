import { ERC721CollectionInformationType } from "../../utils/types/ERC721CollectionInformationType";

const ERC721CollectionInfoTable = (props: { data : ERC721CollectionInformationType }) => {
    const { data } = props;

    // Posting sample data from the Matic collection along with their token hashes
    return (
        <div className="erc721-collection-data-table p-3" style={{ overflowX: 'scroll', paddingBottom: '2rem' }}>
            <table style={{border: '1px solid black'}}>
                <thead style={{border: '1px solid black'}}>
                <tr style={{border: '1px solid black'}}>
                    <th style={{border: '1px solid black'}} scope="col">Token Hash</th>
                    <th style={{border: '1px solid black'}} scope="col">Token Address</th>
                    <th style={{border: '1px solid black'}} scope="col">Token Id</th>
                    <th style={{border: '1px solid black'}} scope="col">Amount</th>
                    <th style={{border: '1px solid black'}} scope="col">Contract Type</th>
                    <th style={{border: '1px solid black'}} scope="col">Symbol</th>
                </tr>
                </thead>
                <tbody>
                    <tr style={{border: '1px solid black'}}>
                        <td style={{border: '1px solid black', fontSize: '18px'}}>{data.result.token_hash}</td>
                        <td style={{border: '1px solid black', fontSize: '18px'}}>{data.result.token_address}</td>
                        <td style={{border: '1px solid black', fontSize: '18px'}}>{data.result.token_id}</td>
                        <td style={{border: '1px solid black', fontSize: '18px'}}>{data.result.amount}</td>
                        <td style={{border: '1px solid black', fontSize: '18px'}}>{data.result.contract_type}</td>
                        <td style={{border: '1px solid black', fontSize: '18px'}}>{data.result.symbol}</td>
                    </tr>
                </tbody>
            </table>
        </div>  
    )
}

export default ERC721CollectionInfoTable;