// Creating a type for holding ERC20 Collection Transfer data
export interface ERC20CollectionTransferInformationType {
    cursor: string,
    result : {
        from_wallet: string,
        to_wallet: string,
        contract_address: string,
        block_hash: string,
        block_number: string,
        block_timestamp: string,
        transaction_hash: string,
        transaction_index: string,
        log_index: string,
        value: string,
        possible_spam: boolean
    }[]
}