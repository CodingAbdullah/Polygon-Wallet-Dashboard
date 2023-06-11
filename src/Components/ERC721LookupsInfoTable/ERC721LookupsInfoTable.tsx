import { ERC721LookupType } from '../../utils/types/ERC721LookupType';

const ERC721LookupsInfoTable = (props : { data: ERC721LookupType }) => {
    const { data } = props;

    return (
            <div>
                <table style={{ border: '1px solid black' }}>
                    <thead style={{ border: '1px solid black' }}>
                    <tr style={{ border: '1px solid black' }}>
                        <th style={{ border: '1px solid black' }} scope="col">Name</th>
                        <th style={{ border: '1px solid black' }} scope="col">Symbol</th>
                        <th style={{ border: '1px solid black' }} scope="col">Owner</th>
                        <th style={{ border: '1px solid black' }}scope="col">Token Address</th>
                        <th style={{ border: '1px solid black' }} scope="col">Token Id</th>
                        <th style={{ border: '1px solid black' }} scope="col">Contract Type</th>
                        <th style={{ border: '1px solid black' }}scope="col">Amount</th>
                        <th style={{ border: '1px solid black' }} scope="col">NFT Link</th>
                    </tr>
                    </thead>
                    <tbody>
                        { // Formatting the table rows to show data
                            <tr>
                                <td style={{ border: '1px solid black', fontSize: '11px' }}>{ data.name }</td>
                                <td style={{ border: '1px solid black', fontSize: '11px' }}>{ data.symbol }</td>
                                <td style={{ border: '1px solid black', fontSize: '11px' }}>{ data.owner_of }</td>
                                <td style={{ border: '1px solid black', fontSize: '11px' }}>{ data.token_address }</td>
                                <td style={{ border: '1px solid black', fontSize: '11px' }}>{ data.token_id }</td>
                                <td style={{ border: '1px solid black', fontSize: '11px' }}>{ data.contract_type }</td>
                                <td style={{ border: '1px solid black', fontSize: '11px' }}>{ data.amount }</td>
                                <td style={{ border: '1px solid black', fontSize: '11px' }}>
                                    <a href={"https://opensea.io/assets/matic/" + data.token_address + "/" + data.token_id } target="_blank" rel="noreferrer">ERC721 Link</a>
                                </td>
                            </tr>
                        }   
                    </tbody>
                </table>
            </div>
    )
}

export default ERC721LookupsInfoTable;