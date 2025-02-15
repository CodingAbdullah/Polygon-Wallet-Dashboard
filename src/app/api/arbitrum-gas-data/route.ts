import hex2dec from 'hex2dec';
import { NextResponse } from "next/server";

// Default function for working with a GET request
export async function GET() {

    // Setting options for request parameters
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        } as HeadersInit
    };

    // Conditionally return data based on request response
    try {
        const response = await fetch('https://api.arbiscan.io/api?module=proxy&action=eth_gasPrice&apikey=' + process.env.ARBISCAN_API_KEY, options);
        const data = await response.json();

        // Return Arbitrum Gas details
        return NextResponse.json({ 
            chainInformation: data,
            gasPrice: Number(hex2dec.hexToDec(data.result))/1000000000 + ' GWei'
        });

    } 
    catch (err) {
        return NextResponse.json({ error: err }, { status: 400 });
    }
}