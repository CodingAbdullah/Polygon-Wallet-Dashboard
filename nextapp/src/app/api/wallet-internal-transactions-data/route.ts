import { NextResponse } from "next/server";

// Default function for working with a POST request
export async function POST(request: Request) {
    const body = await request.json();

    // Setting options for request parameters
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        } as HeadersInit
    };

    // Conditionally return data based on request response
    try {
        const response = await fetch('https://api.arbiscan.io/api?module=account&action=txlistinternal&address=' + body.walletAddress + 
        '&startblock=0&endblock=99999999&page=1&sort=desc&apikey=' + process.env.ARBISCAN_API_KEY, options);
        
        const data = await response.json();

        // Return transaction data
        return NextResponse.json({ 
            txns: data
        });

    } 
    catch (err) {
        return NextResponse.json({ error: err }, { status: 400 });
    }
}