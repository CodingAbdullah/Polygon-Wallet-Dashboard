// Creating a type for holding ERC20 Collection data
export interface ERC20CollectionInformationType {
    nativePrice : {
        value: string,
        name: string,
        symbol: string,
        thumbnail: string,
        decimals: number,
        balance: string
    },
    usdPrice: string,
    exchangeAddress: string,
    exchangeName: string
}