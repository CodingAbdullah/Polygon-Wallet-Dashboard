// Exporting complex data type representing ERC721CollectionInformation Type
export interface ERC721CollectionInformationType {
    total: string,
    page: string,
    page_size: string,
    result: {
        token_address: string,
        token_id: string,
        owner_of: string,
        token_hash: string,
        block_number: string,
        block_number_minted: string,
        contract_type: string,
        minter_address: string,
        amount: string,
        name: string,
        symbol: string
    }
}