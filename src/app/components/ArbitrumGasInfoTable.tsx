'use client';

import useSWR from "swr";
import ArbitrumGasDataType from "../utils/types/ArbitrumGasDataType";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import GenericFetcher from "../utils/functions/GenericFetcher";

// Custom Metrics Navbar Component
// useSWR for efficient data fetching
export default function ArbitrumGasInfoTable() {
    // Data fetching using the custom fetcher function and useSWR
    const { data: gasData, error: gasError, isLoading: gasLoading } = useSWR<ArbitrumGasDataType>('/api/arbitrum-gas-data', GenericFetcher, { refreshInterval: 50000 });

    // Conditionally render ENS Ownership data
    if (gasLoading) {
        return <div>Loading Arbitrum Gas Data...</div>
    }
    else if (gasError) {
        throw new Error();
    }
    else {
        // Render the Arbitrum Gas Info Table Component
        return (
            <div className="p-4 bg-gray-900 mt-10 shadow-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-300">JSON RPC</TableHead>
                            <TableHead className="text-gray-300">ID</TableHead>
                            <TableHead className="text-gray-300">Gas Price</TableHead>
                            <TableHead className="text-gray-300">Date Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow key={1} className="border-b border-gray-800">
                            <TableCell className="font-medium text-gray-100">{ gasData?.chainInformation?.jsonrpc }</TableCell>
                            <TableCell className="font-medium text-gray-100">{ gasData?.chainInformation?.id }</TableCell>
                            <TableCell className="font-medium text-gray-100">{ gasData?.gasPrice }</TableCell>
                            <TableCell className="font-medium text-gray-100">{ new Date().toISOString().split("T")[0] + ' - ' + new Date().toISOString().split("T")[1] }</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}