// Creating a type for holding ERC20 Holding data
export interface ERC20HoldingType {
    holdings : {
        token_address: string,
        name: string,
        symbol: string,
        logo: string,
        thumbnail: string,
        decimals: number,
        balance: string
    }[]
}