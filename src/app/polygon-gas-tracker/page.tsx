import PolygonGasInfoTable from "../components/PolygonGasInfoTable";
import type { Metadata } from "next"

// Custom Metadata
export const metadata: Metadata = {
  title: "Polygon Gas",
  description: "Lookup metrics related to Polygon gas"
}

// Polygon Gas Page Custom Component
export default function PolygonGasPage() {
    return (
        <div className="bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
            <h1 className="text-5xl font-bold mb-6 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
                    Polygon Gas Information
                </span>
            </h1>
            <p className="text-lg mb-8 text-center">
                <i>Lookup gas metrics related to Polygon</i> 
            </p>
            <PolygonGasInfoTable />
        </div>
    )
}