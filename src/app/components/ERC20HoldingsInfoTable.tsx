'use client';

import ERC20HoldingsType from "../utils/types/ERC20HoldingsType";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

// Pass in the array of objects of type ERC20 Holdings to the data properties of the prop object
export default function ERC20HoldingsInfoTable(props : { data: ERC20HoldingsType[] }) {
    const { data } = props;

    // Render the Arbitrum ERC20 Holdings Info Table Component
    return (
        <div className="p-4 bg-gray-900 mt-10 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">Holdings</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Token Address</TableHead>
                        <TableHead className="text-gray-300">Symbol</TableHead>
                        <TableHead className="text-gray-300">Balance</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { data.map((record, key) => {
                        if (record.name === null){ // Conditional Rendering.. no null names to be displayed
                            return null;
                        }
                        else {
                            return (
                                <TableRow key={key} className="border-b border-gray-800">
                                    <TableCell className="font-medium text-gray-100">{ record.name }</TableCell>
                                    <TableCell className="font-medium text-gray-100">{ record.token_address }</TableCell>
                                    <TableCell className="font-medium text-gray-100">{ record.symbol }</TableCell>
                                    <TableCell className="font-medium text-gray-100">{ Number(record.balance)/1000000000000000000 }</TableCell>
                                </TableRow>
                            )
                        }
                    })}
                </TableBody>
            </Table>
        </div>
    )
}