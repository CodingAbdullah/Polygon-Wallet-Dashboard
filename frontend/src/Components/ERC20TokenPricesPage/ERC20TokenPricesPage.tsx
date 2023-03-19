import { FC, useState, useEffect, FormEvent } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';
import moment from 'moment';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const ERC720TokenPricesPage: FC = () => {
    const navigate = useNavigate();

    const [tokenContractAddress, updateContractAddress] = useState('0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'); // Set default to EthDev contract address 
    const [formAlert, updateAlert] = useState("");

    const [coinInfo, updateCoinInfo] = useState({
      information: null
    });    
  
    const [erc20Info, updateErc20Info] = useState({ // Update information, when user requests a valid ERC20 token
      information: null
    });

    // Give a type to this piece of state later
    const [chartData, setChartData] = useState({}); // Data for data points on chart

    // API information
    const URL= "https://api.coingecko.com/api/v3";
    const ERC20_INFO_ENDPOINT = '/coins/matic-network/contract/' + tokenContractAddress;
    const ERC20_PRICE_ENDPOINT = '/coins/matic-network/contract/' + tokenContractAddress + '/market_chart?vs_currency=usd&days=0.05';


    // Get Ethereum data initially
    useEffect(() => {
        const fetchCoins = async () => {      
            await fetch(URL + "/coins/matic-network/market_chart?vs_currency=usd&days=14&interval=daily")
            .then(response => response.json())
            .then(res => {
                setChartData(prevState => {
                    let days = [];
                    for (var i = 1; i < 15; i++){
                        days.push(moment().subtract(i, 'days').calendar());
                    }
                    return {
                        ...prevState,
                        res,
                        time: days.reverse()
                    }
                });
            });

            // Get current ETH price
            await fetch(URL + "/simple/price?ids=matic-network&vs_currencies=usd&include_24hr_change=true") 
            .then(response => response.json())
            .then(res => {
                if (res.ethereum !== undefined) { // Since we are getting ETH initially, res.ethereum
                    updateCoinInfo((prevState) => {
                        return {
                            ...prevState,
                            information: res
                        }
                    });
                }
            });
        };
        fetchCoins();
    }, [])

    const clearHandler = () => {
        // Remove data and chart information
        updateErc20Info((prevState) => {
            return {
                ...prevState,
                information: null
            }
        });

        // Run this function to display Ethereum data once again
        fetch(URL + "/coins/matic-network/market_chart?vs_currency=usd&days=14&interval=daily")
        .then(response => response.json())
        .then(res => {
            setChartData(prevState => {
                let days = [];
                for (var i = 1; i < 15; i++){
                    days.push(moment().subtract(i, 'days').calendar());
                }
                return {
                    ...prevState,
                    res,
                    time: days.reverse()
                }
            });
        })
        updateAlert("");
    }

    const formHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (tokenContractAddress.length === 42 && tokenContractAddress.substring(0, 2) === "0x"){
            // Fetch token contract address to check the value 
            await fetch(URL + ERC20_INFO_ENDPOINT)
            .then(response => response.json())
            .then(res => {
                if (res.error){
                    updateAlert('invalid'); // Set alert if error is found to notify invalid contract address
                }
                else {
                    updateAlert('');          
                    updateErc20Info((prevState) => { // Get relevant information regarding the ERC20 token
                        return {
                            ...prevState,
                            information: res
                        }
                    });
                }
            })
            .catch(() => {
                updateAlert('invalid');
            }); 

            await fetch(URL + ERC20_PRICE_ENDPOINT) // If ERC20 token information is valid, get the latest 10 price points
            .then(response => response.json())
            .then(res => {
                setChartData(prevState => {
                    let units = [];
                    for (var i = 1; i < 11; i++){
                        units.push(i); // No need to use momentjs library here, just ten entry points
                    }
                    return {
                        ...prevState,
                        res,
                        time: units
                    }
                });
            });
        }
    }

    // Set display configurations
    var data = {
        // labels: chartData.time,
        datasets: [{
            label: erc20Info.information === null ? 'Matic Price' : 'Last Ten Price Points',
            // data: chartData?.res?.prices?.map(x => x[1].toFixed(2)),
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1
        }]
    };

    // Adding options to enhance charts
    var options = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: erc20Info.information === null ? 'Matic Chart' : ' Chart'
            },
            legend: {
                display: true,
                position: "bottom"
            }
        }
    }

    // Generic coin setup using Object keys from API responses to generate output, code added when user requests a display of a valid ERC 20 token
    return (
        <div className="erc20-token-prices-page" style={{ textAlign: 'center' }}>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h2>ERC20 Token Market Data</h2>
                </div>
                { formAlert === "invalid" ? <div><Alert type="danger"/></div> : <div/> }
                <div className="jumbotron bg-light p-3">
                    <div className="container">
                        <form onSubmit={ formHandler } style={{ marginTop: '1.5rem' }}>
                            <label style={{ marginRight: '0.5rem' }}>Enter <b>ERC20</b> Contract Address for Token Price Data (Defaults to ETH): </label>
                            <input type="text" onChange={ (e) => updateContractAddress(e.target.value) } placeholder="Enter here" required />
                            <br />
                            <button style={{ marginTop: '2rem' }} type="submit" className="btn btn-success">Check Data</button>
                        </form>
                        <div>
                            <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                            <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning' onClick={ clearHandler }>Clear</button>              
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}    

export default ERC720TokenPricesPage;