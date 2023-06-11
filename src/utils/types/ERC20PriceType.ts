// Adding complex type for handling ERC20 Token Prices API Response object
export interface ERC20PriceType {
    id: string,
    symbol: string,
    name: string,
    asset_platform_id: string,
    platforms: {
        "polygon-pos": string
    },
    block_time_in_minutes: number,
    hashing_algorithm: string,
    public_notice: string,
    additional_notices: Array<any>,
    image: {
        thumb: string,
        small: string,
        large: string
    },
    contract_address: string,
    market_data: {
        current_price: {
            usd: number
        },
        total_value_locked: string,
        mcap_to_tvl_ratio: string,
        fdv_to_tvl_ratio: string,
        roi: string,
        ath : {
            usd: number,
        },
        ath_change_percentage: {
            usd: number,
        },
        ath_date: {
            usd: string,
        },
        atl: {
            usd: number,
        },
        atl_change_percentage: {
            usd: number,
        },
        atl_date: {
            usd: string,
        },
        market_cap_rank: null,
        fully_diluted_valuation: {
            usd: number,
        },
        total_volume: {
            usd: number,
        },
        high_24h: {
            usd: number,
        },
        low_24h: {
            usd: number,
        },
        price_change_24h: number,
        price_change_percentage_24h: number,
        price_change_percentage_7d: number,
        price_change_percentage_14d: number,
        price_change_percentage_30d: number,
        price_change_percentage_60d: number,
        price_change_percentage_200d: number,
        price_change_percentage_1y: number,
        market_cap_change_24h: number,
        market_cap_change_percentage_24h: number,
        price_change_24h_in_currency: {
            usd: number,
        },
        price_change_percentage_1h_in_currency: {
            usd: number,
        },
        price_change_percentage_24h_in_currency: {
            usd: number,
        },
        price_change_percentage_7d_in_currency: {
            usd: number,
        },
        price_change_percentage_14d_in_currency: {
            usd: number,
        }
        price_change_percentage_30d_in_currency: {
            usd: number,
        },
        price_change_percentage_60d_in_currency: {
            usd: number,
        },
        price_change_percentage_200d_in_currency: {
            usd: number,
        },
        price_change_percentage_1y_in_currency: {
            usd: number,
        },
        market_cap_change_24h_in_currency: {
            usd: number,

        },
        market_cap_change_percentage_24h_in_currency: {
            usd: number,
        },
        total_supply: number,
        max_supply: number,
        circulating_supply: number,
        last_updated: string
    } 
}