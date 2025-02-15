'use client';

import GenericFetcher from '@/app/utils/functions/GenericFetcher';
import useSWR from 'swr';
import NavbarPolygonDataType from '../utils/types/NavbarPolygonDataType';
import PolygonGasDataType from '../utils/types/PolygonGasDataType';

// Custom Metrics Navbar Component
// useSWR for efficient data fetching
export default function MetricsNavbar() {
    // Data fetching using the custom fetcher function and useSWR
    const { data: polygonData, error: ethError, isLoading: arbLoading } = useSWR<{ tokenPrice: NavbarPolygonDataType }>('/api/polygon-price-data', GenericFetcher, { refreshInterval: 50000 });
    const { data: polygonGasData, error: gasError, isLoading: gasLoading } = useSWR<PolygonGasDataType>('/api/polygon-gas-data', GenericFetcher, { refreshInterval: 50000 });

    // Conditionally rendering component
    if (ethError || gasError) 
        return <div className="bg-red-500 text-white p-2">Error fetching data</div>

    else if (arbLoading || gasLoading) 
        return <div className="bg-gray-800 text-white p-2">Loading...</div>

    else if (polygonData && polygonGasData) {
        const polygon = polygonData.tokenPrice["matic-network"];

        // Returning the final JSX code for component
        return (
            <nav className="bg-gray-900 text-white py-2 px-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-4 items-center">
                        <div className="flex items-center space-x-2">
                            <span className="ping-animation w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-green-500 text-xs font-semibold">Live</span>
                        </div>                        
                            <span>Polygon Price: <span>${ Number(polygon?.usd).toFixed(2) }</span></span>
                        <span>
                            24-Hr % Chg: 
                            <span className={ Number(polygon?.usd_24h_change) >= 0 ? 'text-green-500' : 'text-red-500' }>
                                { Number(polygon?.usd_24h_change) > 0 ? ' +' : ' ' }
                                { Number(polygon?.usd_24h_change).toFixed(2) }%
                            </span>
                        </span>
                        <span>Gas Price: <span className="font-bold">{ polygonGasData?.gasPrice }</span></span>
                    </div>
                </div>
            </nav>
        )
    }
}