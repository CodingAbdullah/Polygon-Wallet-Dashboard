import { NextResponse } from "next/server";

// Default function for working with a POST request
export async function POST(request: Request) {
    const body = await request.json();

    // Setting options for request parameters
    const polygonPriceOptions = {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        } as HeadersInit
    };

    // Setting options for authenticated API call
    const ethPriceOptions = {
        method: "GET",
        headers : {
            'content-type' : 'application/json',
            'access-control-allow-origin': '*',
            'x-cg-pro-api-key' : process.env.COINGECKO_PRICES_API_KEY // API-KEY for authenticated call
        } as HeadersInit
    }

    try {
        // Make FETCH request to gather data related to Polygon, Ethereum
        const polygonWalletResponse = await fetch("https://api.polygonscan.com/api?module=account&action=balance&address=" + body.walletAddress + "&apikey=" + process.env.MATIC_API_KEY, polygonPriceOptions);
        const polygonPriceResponse = await fetch('https://pro-api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd', ethPriceOptions);
        
        // Conver to JSON data related to Polygon and Ethereum
        const polygonWalletData = await polygonWalletResponse.json();
        const polygonData = await polygonPriceResponse.json();

        // Return the dataset
        return NextResponse.json({
            balanceInformation: polygonWalletData,
            polygonPrice: polygonData['matic-network'].usd
        });
    }
    catch (err) {
        return NextResponse.json({ error: err }, { status: 400 });
    }
}