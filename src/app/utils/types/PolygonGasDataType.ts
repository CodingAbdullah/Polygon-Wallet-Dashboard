// Adding interfaces to represent complex types
export default interface PolygonGasDataType {
    chainInformation: {
        jsonrpc: string,
        id: number,
        result: string
    }
    gasPrice: string
}