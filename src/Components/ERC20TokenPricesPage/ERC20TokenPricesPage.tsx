import { FC, useState, useRef, FormEvent } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';
import ERC720PricesInfoTable from '../ERC20TokenPricesInfoTable/ERC20TokenPricesInfoTable';
import { ERC20PriceType } from '../../utils/types/ERC20PriceType';
import { useNavigate } from 'react-router-dom';

const ERC20TokenPricesPage: FC = () => {
    const navigate = useNavigate();
    const tokenContractAddress = useRef<HTMLInputElement>(null);
    const [formAlert, updateAlert] = useState<string>("");
    const [erc20Info, updateErc20Info] = useState<ERC20PriceType>(); // Update information, when user requests a valid ERC20 token});

    const clearHandler = () => {
      // Remove data and chart information
      updateErc20Info(undefined);
      updateAlert("");
    }

    const formHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (tokenContractAddress.current!.value.length === 42 && tokenContractAddress.current!.value.substring(0, 2) === "0x"){
            
            // API information
            let URL= "https://api.coingecko.com/api/v3";
            let ERC20_INFO_ENDPOINT = '/coins/matic-network/contract/' + tokenContractAddress.current?.value;

            await axios(URL + ERC20_INFO_ENDPOINT)
            .then(response => {
                updateAlert('');          
                updateErc20Info(response.data); // Get relevant information regarding the ERC20 token
            })
            .catch(() => {
                updateAlert('invalid');
            }); 
        }
        else {
            updateAlert("invalid"); // If repeated multiple times, clear input and keep error as is
        }
    }
      // Generic coin setup using Object keys from API responses to generate output, code added when user requests a display of a valid ERC 20 token
      return (
        <div>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h2>ERC20 Token Market Data</h2>
                </div>
                    { formAlert === "invalid" ? <div><Alert type="danger"/></div> : <div/> }
                    <div className="jumbotron bg-light p-3" style={{ textAlign: 'center' }}>
                        <div className="container">
                            <form onSubmit={ formHandler } style={{ marginTop: '1.5rem' }}>
                                <label style={{ marginRight: '0.5rem' }}>Enter <b>ERC20</b> Contract Address for Token Information (Defaults to ETH): </label>
                                <input type="text" ref={ tokenContractAddress } placeholder="Enter here" required />
                                <br />
                                <button style={{ marginTop: '2rem' }} type="submit" className="btn btn-success">Check Data</button>
                            </form>
                            <div>
                                <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                                <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning' onClick={ clearHandler }>Clear</button>              
                            </div>
                        </div>
                    </div>
                {
                    // Display data of the valid ERC20 token
                    erc20Info === undefined || formAlert === 'invalid' ? <div /> :
                        <div style={{ textAlign: 'center' }}>
                            <ERC720PricesInfoTable data={ erc20Info } />
                        </div>
                }
            </main>
        </div>        
    )
}
 

export default ERC20TokenPricesPage;