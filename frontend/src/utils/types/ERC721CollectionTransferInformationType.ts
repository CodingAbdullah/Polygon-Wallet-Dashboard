// Interface containing ERC721Collection Transfer Information
export interface ERC721CollectionTransferInformationType {
    total: string,
    page: string,
    page_size: string,
    cursor: string
    result: {
        token_address: string,
        token_id: string,
        from_address: string,
        to_address: string,
        value: string,
        amount: string,
        contract_type: string,
        block_number: string,
        block_timestamp: string,
        block_hash: string,
        transaction_hash: string,
        transaction_index: number,
        transaction_type: string,
        log_index: number,
        operator: string,
        verified: number,
        possible_span: boolean
    }[],
    block_exists: boolean,
    index_complete: boolean
}