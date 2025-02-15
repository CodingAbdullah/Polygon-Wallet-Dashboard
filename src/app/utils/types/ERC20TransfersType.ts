// Adding ERC20TransferType to represent ERC20 transfers
export default interface ERC20TransfersType {
    total: number,
    page: number,
    page_size: number,
    result: {
        transaction_hash: string,
        address: string, // Address of token
        block_timestamp: string,
        block_number: string,
        block_hash: string,
        to_address: string,
        from_address: string,
        value: string, // Calculated in wei
        transaction_index: number,
        log_index: number
    }[]
}