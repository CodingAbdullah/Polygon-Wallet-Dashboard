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
        const response = await fetch(MORALIS_URL + 'nft/' + body.walletAddress + "/" + body.id + "/transfers?chain=arbitrum&format=decimal", options);
        const data = await response.json();

        // Return ERC721 lookup transfers data
        return NextResponse.json({ 
            lookupTransfers: data
        });

    } 
    catch (err) {
        return NextResponse.json({ error: err }, { status: 400 });
    }
}