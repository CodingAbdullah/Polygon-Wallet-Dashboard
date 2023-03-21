import { ERC20PriceType } from '../../utils/types/ERC20PriceType';

const ERC20PricesInfoTable = (props: { data: ERC20PriceType }) => {
    const { data } = props; // Destructure data

    let location = window.location.pathname;

    // Display data of the valid ERC20 token
    return (
      <div className={ location === '/erc20-token-prices' ? "" : "" } style={{ overflowX: 'scroll', paddingBottom: '2rem', marginTop: '5rem', textAlign: 'center' }}>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2>Information</h2>
            </div>
        <table style={{ border: '1px solid black', textAlign: 'center' }}>
            <tbody style={{ border: '1px solid black' }}>
              <tr style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}><b>Name</b></td>
                <td style={{ border: '1px solid black' }}>{ data.name }</td>
              </tr>
              <tr style={{border: '1px solid black'}}>
                <td style={{border: '1px solid black'}}><b>Contract Address</b></td>
                <td style={{border: '1px solid black'}}>{ data.contract_address }</td>
              </tr>
              <tr style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}><b>Last Updated</b></td>
                <td style={{ border: '1px solid black' }}>{ data.market_data.last_updated.split('T')[0] }</td>
              </tr>
              <tr style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}><b>Total Supply</b></td>
                <td style={{ border: '1px solid black' }}>{ data.market_data.total_supply }</td>
              </tr>
              <tr style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}><b>Max Supply</b></td>
                <td style={{ border: '1px solid black' }}>{ data.market_data.max_supply }</td>
              </tr>
              <tr style={{ border: '1px solid black'}}>
                <td style={{ border: '1px solid black'}}><b>Circulating Supply</b></td>
                <td style={{ border: '1px solid black'}}>{ data.market_data.circulating_supply }</td>
              </tr>
              <tr style={{ border: '1px solid black'}}>
                <td style={{ border: '1px solid black'}}><b>24 Hr. Price % Change</b></td>
                <td style={{ color: data.market_data.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                  <b>{ data.market_data.price_change_percentage_24h > 0 ? "+" : "" }{ data.market_data.price_change_percentage_24h.toFixed(2) + "%" }</b>
                </td>
              </tr>
              <tr style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}><b>24 Hr. Highest Price</b></td>
                <td style={{ border: '1px solid black' }}>{ data.market_data.high_24h.usd }</td>
              </tr>
              <tr style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}><b>24 Hr. Lowest Price</b></td>
                <td style={{ border: '1px solid black' }}>{ data.market_data.low_24h.usd }</td>
              </tr>
              <tr style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}><b>All-Time Lowest Price</b></td>
                <td style={{ border: '1px solid black' }}>{ data.market_data.atl.usd }</td>
              </tr>
              <tr style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}><b>All-Time Lowest Price Date</b></td>
                <td style={{ border: '1px solid black' }}>{ data.market_data.atl_date.usd.split("T")[0] }</td>
              </tr>
              <tr style={{border: '1px solid black'}}>
                <td style={{border: '1px solid black'}}><b>All-Time Highest Price</b></td>
                <td style={{border: '1px solid black'}}>{ data.market_data.ath.usd }</td>
              </tr>
              <tr style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}><b>All-Time Highest Price Date</b></td>
                <td style={{ border: '1px solid black' }}>{ data.market_data.ath_date.usd.split("T")[0] }</td>
              </tr>
              <tr style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}><b>All-Time Highest Price to Current % Change</b></td>
                <td style={{ color: data.market_data.ath_change_percentage.usd < 0 ? 'red' : 'green' }}>
                  <b>{ data.market_data.ath_change_percentage.usd.toFixed(2) + "%" }</b>
                </td>
              </tr>
            </tbody>
        </table> 
      </div>  
    )
}

export default ERC20PricesInfoTable;