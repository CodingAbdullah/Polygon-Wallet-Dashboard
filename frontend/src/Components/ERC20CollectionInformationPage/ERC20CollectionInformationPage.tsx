import { FC, useState, useRef, FormEvent } from 'react';
import React from 'react';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router';

// Adding ERC20 Collection Page for Analytics
const ERC20CollectionInformationPage: FC = () => {
    const [setAlert, updateAlert] = useState<boolean>(false);
    const tokenAddress = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    
    const clearHandler = () => {

    }

    const formHandler = (e: FormEvent<HTMLFormElement>) => {

    }

    return (
        <div className="erc20-collection-page" style={{ textAlign: 'center' }}>
            <main role="main" className="p-3">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">ERC20 Token Analytics</h1>
                </div>
                { setAlert ? <Alert type='danger' /> : null }
                <div className="jumbotron bg-light p-3">
                    <div className="container">
                        <p>Enter Contract Address of the <b>ERC20</b> Token for Additional Information</p>
                        <form onSubmit={ formHandler }>
                            <input ref={ tokenAddress } type='text' placeholder='Enter Address Here'></input>
                            <br />
                            <button style={{ marginTop: '2rem' }} type='submit' className='btn btn-success'>Submit</button>
                        </form> 
                        <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary' onClick={ () => navigate("/") }>Go Home</button>
                        <button style={{ marginTop: '2rem', marginLeft: '2rem' }} className='btn btn-warning' onClick={ clearHandler }>Clear</button>
                    </div>  
                </div>
            </main>
        </div>
    )
}

export default ERC20CollectionInformationPage;