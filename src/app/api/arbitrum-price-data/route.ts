import { NextResponse } from "next/server";

// Default function for working with a GET request
export async function GET() {

    // Setting options for request parameters
    // Setting options for authenticated API call
    const arbPriceOptions = {
        method: "GET",
        headers : {
            'content-type' : 'application/json',
            'access-control-allow-origin': '*',
            'x-cg-pro-api-key' : process.env.COINGECKO_HOME_PAGE_API_KEY // API-KEY for authenticated call
        } as HeadersInit
    }
    
    // Run the requests and conditionally return data based on response
    try {
        const arbPriceResponse = await fetch('https://pro-api.coingecko.com/api/v3/simple/price?ids=arbitrum&vs_currencies=usd&include_24hr_change=true', arbPriceOptions);

        // Formulate Arbitrum Price and Gas data
        const arbPriceData = await arbPriceResponse.json();

        // Return token price and gas information
        return NextResponse.json({
            tokenPrice: arbPriceData
        });
    }
    catch (err) {
        return NextResponse.json({ error: err }, { status: 400 });
    }
}
