// Creating a type for holding ERC20 Transfer data
export interface ERC20TransferType {
    transfers: {
        total: string,
        page: number,
        page_size: number,
        cursor: string,
        result: {
            transaction_hash: string,
            address: string,
            block_timestamp: string,
            block_number: string,
            to_address: string,
            from_address: string,
            value: string,
            transaction_index: number,
            log_index: number
        }[]
    }
}