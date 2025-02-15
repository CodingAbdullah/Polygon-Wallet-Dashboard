import NavbarLinkObject from "@/app/utils/types/NavbarObject";

// Constants for working with Navbar Links
export const NavbarLinks: NavbarLinkObject[] = [
    {
        name: 'Arbitrum Gas Info',
        dropdown: [{
            name: 'Gas Information', href: '/arbitrum-gas-tracker'
        }]
    },
    {
        name: 'Arbitrum Price',
        dropdown: [
            { name: 'Price Action', href: '/arbitrum-price' }
        ]
    },
    {
        name: 'Token Holdings',
        dropdown: [
            { name: 'ERC20 Holdings', href: '/erc20-holdings' },
            { name: 'ERC721 Holdings', href: '/erc721-holdings' }
        ]
    },
    {
        name: 'Token Lookups',
        dropdown: [
            { name: 'ERC721 Token Lookups', href: '/erc721-lookups' }
        ]
    },
    {
        name: 'Wallet Analytics',
        dropdown: [
            { name: 'Wallet Information', href: '/wallet-analytics' }
        ]
    }
];