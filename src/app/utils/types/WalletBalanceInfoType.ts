// Wallet Balance Data Type
export default interface WalletBalanceInfoType {
    balanceInformation: {
        status: string,
        message: string,
        result: string
    },
    ethPrice: number
}