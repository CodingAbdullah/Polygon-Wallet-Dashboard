// Creating a type for holding ERC20 Collection data
export interface ERC20CollectionInformationType {
    nativePrice : {
        value: string,
        name: string,
        symbol: string,
        decimals: number,
    },
    usdPrice: number,
    exchangeAddress: string,
    exchangeName: string
}