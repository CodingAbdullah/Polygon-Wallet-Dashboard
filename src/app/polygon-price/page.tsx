import PolygonPriceChart from "../components/PolygonPriceChart";
import type { Metadata } from "next"

// Custom Metadata
export const metadata: Metadata = {
  title: "Polygon Price",
  description: "Lookup price metrics related to the Polygon blockchain"
}

// Arbitrum Price Page Wrapper Custom Component
export default function PolygonPricePage() {
    return (
        <div className="bg-gray-800 text-gray-300 py-5 px-4 sm:px-6 lg:px-8 shadow-lg">
            <PolygonPriceChart />
        </div>
    )
}