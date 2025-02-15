import ArbitrumPriceChart from "../components/ArbitrumPriceChart";
import type { Metadata } from "next"

// Custom Metadata
export const metadata: Metadata = {
  title: "Arbitrum Price",
  description: "Lookup price metrics related to the Arbitrum blockchain"
}

// Arbitrum Price Page Wrapper Custom Component
export default function ArbitrumPricePage() {
    return (
        <div className="bg-gray-800 text-gray-300 py-5 px-4 sm:px-6 lg:px-8 shadow-lg">
            <ArbitrumPriceChart />
        </div>
    )
}