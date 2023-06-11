// Adding type to handle complex gas/price data
export interface GasPriceType {
    time: string,
    gasInformation : {
        jsonrpc: string,
        id: number,
        result: string
    },
    gasPrice: string
}