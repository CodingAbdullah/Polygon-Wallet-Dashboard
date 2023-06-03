// Complex type representation for the ERC721Collection Sales type
export interface ERC721CollectionSalesInformationType {
    total: string,
    page: number,
    page_size: number,
    cursor: string,
    result : {
        transaction_hash: string,
        transaction_index: string,
        token_ids: Array<string>,
        seller_address: string,
        buyer_address: string,
        token_address: string,
        marketplace_address: string,
        price: string,
        price_token_address: string,
        block_timestamp: string,
        block_number: string,
        block_hash: string
    }[]
}