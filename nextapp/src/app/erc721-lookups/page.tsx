import ERC721LookupsForm from "../components/ERC721LookupsForm";
import type { Metadata } from "next"

// Custom Metadata
export const metadata: Metadata = {
  title: "Arbitrum ERC721 Lookups",
  description: "Lookup Arbitrum ERC721 tokens"
}

export default function ERC721LookupsPage() {
    // Render the ERC721 Holdings Page Component
    return (
        <div className="min-h-screen bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
            <h1 className="text-5xl font-bold mb-6 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
                    ERC721 Token Lookups
                </span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 text-center">
                Dive deep into wallet Holdings
            </p>
            <ERC721LookupsForm />
        </div>
    )
}