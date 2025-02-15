'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import ERC721LookupType from "../utils/types/ERC721LookupType";
import Link from "next/link";
import useSWR from "swr";
import PostFetcherArgs from "../utils/types/PostFetcherArgs";
import PostFetcher from "../utils/functions/PostFetcher";

// Pass in the array of objects of type ERC721 Lookups to the data properties of the prop object
export default function ERC721LookupsInfoTable(props : { address: string, tokenID: string }) {
    const { address, tokenID } = props;

    // Make API call upon loading the custom component
    const { data, error, isLoading } = 
    useSWR<ERC721LookupType>(['/api/arbitrum-erc721-lookup-data', { walletAddress: address, id: tokenID }], ([url, body]: [string, PostFetcherArgs]) => PostFetcher(url, { arg: body }), { refreshInterval: 100000 });
    
    // Conditionally render data
    if (error) {
        throw new Error();
    }
    else if (isLoading) {
        return <div>Loading ERC721 Lookups Info Table</div>
    }
    else {
        // Render the Arbitrum ERC721 Lookups Info Table Component
        return (
            <div className="p-4 bg-gray-900 mt-10 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">Lookup Information</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-300">Name</TableHead>
                            <TableHead className="text-gray-300">Symbol</TableHead>
                            <TableHead className="text-gray-300">Owner</TableHead>
                            <TableHead className="text-gray-300">Contract Type</TableHead>
                            <TableHead className="text-gray-300">Amount</TableHead>
                            <TableHead className="text-gray-300">Token Link</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow key={1} className="border-b border-gray-800">
                            <TableCell className="font-medium text-gray-100">{ data?.lookupInformation?.name }</TableCell>
                            <TableCell className="font-medium text-gray-100">{ data?.lookupInformation?.symbol }</TableCell>
                            <TableCell className="font-medium text-gray-100">{ data?.lookupInformation?.owner_of }</TableCell>
                            <TableCell className="font-medium text-gray-100">{ data?.lookupInformation?.contract_type }</TableCell>
                            <TableCell className="font-medium text-gray-100">{ data?.lookupInformation?.amount }</TableCell>
                            <TableCell className="font-medium text-gray-100">
                                <Link href={"https://opensea.io/assets/arbitrum/" + data?.lookupInformation?.token_address + "/" + data?.lookupInformation?.token_id } target="_blank" rel="noreferrer"><u>ERC721 Link</u></Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}