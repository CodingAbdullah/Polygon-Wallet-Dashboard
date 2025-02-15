import { NextResponse } from "next/server";

const MORALIS_URL = 'https://deep-index.moralis.io/api/v2/';

// Default function for working with a POST request
export async function POST(request: Request) {
    const body = await request.json();

    // Setting options for request parameters
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'X-API-KEY': process.env.MORALIS_API_KEY ?? ''
        } as HeadersInit
    };

    // Conditionally return data based on request response
    try {
        const response = await fetch(MORALIS_URL + body.walletAddress + '/nft/transfers?chain=arbitrum&format=decimal&direction=both', options);
        const data = await response.json();

        // Return ERC721 transfers data
        return NextResponse.json({ 
            transfers: data
        });

    } 
    catch (err) {
        return NextResponse.json({ error: err }, { status: 400 });
    }
}