'use client';

import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import ERC721HoldingsType  from "../utils/types/ERC721HoldingsType";

// Pass in the array of objects of type ERC721 Holdings to the data properties of the prop object
export default function ERC721HoldingsInfoTable(props : { data: ERC721HoldingsType }) {
    const { data } = props;

    // Render the Arbitrum ERC721 Holdings Info Table Component
    return (
        <div className="p-4 bg-gray-900 mt-10 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">Holdings</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Token Address</TableHead>
                        <TableHead className="text-gray-300">Token ID</TableHead>
                        <TableHead className="text-gray-300">Symbol</TableHead>
                        <TableHead className="text-gray-300">Link</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { data?.holdings?.result?.map((record, key) => {
                        return (
                            <TableRow key={key} className="border-b border-gray-800">
                                <TableCell className="font-medium text-gray-100">{ record.name }</TableCell>
                                <TableCell className="font-medium text-gray-100">{ record.token_address }</TableCell>
                                <TableCell className="font-medium text-gray-100">{ record.token_id }</TableCell>
                                <TableCell className="font-medium text-gray-100">{ record.symbol }</TableCell>
                                <TableCell>
                                    <Link href={ "https://opensea.io/assets/arbitrum/" + record.token_address + "/" + record.token_id } target="_blank" rel="noreferrer"><u>ERC721 Link</u></Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}