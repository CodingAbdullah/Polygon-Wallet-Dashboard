// Only supported for Polygon Mainnet, complex type representing ERC721CollectionAttributes
// Summary attribute is a generic object consisting of x number of attributes with y sub-attributes in them
export interface ERC721CollectionAttributesType {
    summary : object,
    totalSupply: number,
    contractAddress: string
}