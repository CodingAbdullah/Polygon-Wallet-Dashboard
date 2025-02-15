// Adding interfaces to represent complex types
export default interface ArbitrumGasDataType {
    chainInformation: {
        jsonrpc: string,
        id: number,
        result: string
    }
    gasPrice: string
}