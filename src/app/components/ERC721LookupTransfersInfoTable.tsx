'use client';

import useSWR from "swr";
import PostFetcher from "../utils/functions/PostFetcher";
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import ERC721LookupTransfersType from "../utils/types/ERC721LookupTransfersType";
import PostFetcherArgs from "../utils/types/PostFetcherArgs";

// Custom ERC721 Lookup Transfers Info Table Component
export default function ERC721LookupTransfersInfoTable(props: { address: string, tokenID: string }) {
    const { address, tokenID } = props;

    // Make API call upon loading the custom component
    const { data, error, isLoading } = 
    useSWR<ERC721LookupTransfersType>(['/api/arbitrum-erc721-lookup-transfers-data', { walletAddress: address, id: tokenID }], ([url, body]: [string, PostFetcherArgs]) => PostFetcher(url, { arg: body }), { refreshInterval: 100000 });
    
    // Conditionally render the info table 
    if (isLoading) {
        return <div>Loading ERC721 Token Transfers Lookup Info Table</div>
    }
    else if (error) {
        throw new Error();
    }
    else {

        // Render ERC721 Token Lookup Transfers Info Table
        return (
            <div className="p-4 bg-gray-900 mt-10 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">Token Transfers</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-300">Date</TableHead>
                            <TableHead className="text-gray-300">Transaction Hash</TableHead>
                            <TableHead className="text-gray-300">From</TableHead>
                            <TableHead className="text-gray-300">To</TableHead>
                            <TableHead className="text-gray-300">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.lookupTransfers?.result?.map((transfer, index: number) => (
                            <TableRow key={index} className="border-b border-gray-800">
                                <TableCell className="text-gray-300">{String(transfer.block_timestamp).split(".")[0]}</TableCell>
                                <TableCell className="text-gray-300">{transfer.transaction_hash}</TableCell>
                                <TableCell className="text-gray-300">{transfer.from_address}</TableCell>
                                <TableCell className="text-gray-300">{transfer.to_address}</TableCell>
                                <TableCell className="text-gray-300">{transfer.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}   