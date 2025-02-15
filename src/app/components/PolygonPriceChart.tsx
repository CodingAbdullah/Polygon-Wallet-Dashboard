'use client';

import { useState } from 'react';
import useSWR from 'swr';
import GenericFetcher from '../utils/functions/GenericFetcher';
import PostFetcher from '../utils/functions/PostFetcher';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import NavbarPolygonDataType from '../utils/types/NavbarPolygonDataType';
import PostFetcherArgumentsType from '../utils/types/PostFetcherArgs';

// Polygon Price Chart Custom Component
export default function PolygonPriceChart() {
    const [interval, setInterval] = useState<string>('7');

    // Fetch data related to Polygon
    // Fetch data for Polygon chart display
    const { data: polygonPriceData, error: polygonPriceError, isLoading: polygonPriceLoading } = 
    useSWR<{ tokenPrice: NavbarPolygonDataType }>('/api/polygon-price-data', GenericFetcher, { refreshInterval: 50000 });
    
    const { data: polygonChartData, error: polygonChartError, isLoading: polygonChartLoading } = 
    useSWR(['/api/polygon-historical-price-data', { interval }], ([url, body]: [string, PostFetcherArgumentsType]) => PostFetcher(url, { arg: body }), { refreshInterval: 50000 });

    // Conditionally render data
    if (polygonChartError || polygonPriceError) {
        return <div>Error Loading Polygon Chart Data...</div>
    }
    else if (polygonPriceLoading || polygonChartLoading) {
        return <div>Loading Polygon Chart Data...</div>
    }
    else {
        // Retrieve key information
        const chartData = polygonChartData.coinPrices;

        // Modifying the y-axis domain for appropriate ranges
        const prices = polygonChartData.coinPrices.map((item: { price: string }) => item.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const buffer = (max - min) * 0.1; // 10% buffer
        
        // Render data based on market information
        return (
            <div className="bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
                <h1 className="text-5xl font-bold mb-6 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
                        Historical Price Information
                    </span>
                </h1>
                <Card className="w-full bg-gray-900 border-gray-700 mt-10">
                    <CardHeader>
                        <CardTitle className="text-xl text-gray-100">Polygon</CardTitle>
                        <CardDescription className="text-gray-100">
                            Current Price:<b>{ "$" + polygonPriceData?.tokenPrice["matic-network"].usd }</b>
                        </CardDescription>
                        <div className="flex items-center space-x-2">
                            <CardDescription className='text-gray-100'>
                                24 Hour % Change: 
                            </CardDescription>
                            <CardDescription className={ Number(polygonPriceData?.tokenPrice["matic-network"].usd_24h_change) < 0 ? 'text-red-500' : 'text-green-500' }>
                                <b>{ Number(polygonPriceData?.tokenPrice["matic-network"].usd_24h_change) >= 0 ? ' +' : '' }</b><b>{ Number(polygonPriceData?.tokenPrice["matic-network"].usd_24h_change).toFixed(2) + '%' }</b>
                            </CardDescription>
                        </div>
                        <Select value={interval} onValueChange={setInterval}>
                            <SelectTrigger className="w-[180px] bg-gray-700 text-gray-100">
                                <SelectValue placeholder="Select Interval" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 text-gray-100">
                                <SelectItem value="24">24 Hours</SelectItem>
                                <SelectItem value="7">7 Days</SelectItem>
                                <SelectItem value="14">15 Days</SelectItem>
                                <SelectItem value="30">30 Days</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={chartData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 80,
                                        bottom: 20
                                    }}
                                >
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis 
                                    dataKey="date" 
                                    stroke="#888" 
                                    tick={{fill: '#888'}}
                                    padding={{ left: 10, right: 10 }}
                                />
                                <YAxis 
                                    stroke="#888" 
                                    dataKey="price"
                                    tick={{fill: '#888'}}
                                    domain={[Math.max(0, min - buffer), max + buffer]}
                                    padding={{ top: 10, bottom: 10 }}
                                    tickFormatter={(value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#333', border: 'none'}}
                                    labelStyle={{color: '#888'}}
                                    itemStyle={{color: '#fff'}}  
                                />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="price" 
                                    stroke="#ff4136" 
                                    strokeWidth={2}
                                    dot={true}
                                    name="Price (USD)"
                                />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}