import { FC } from 'react';
import './Navbar.css';

const Navbar: FC = () => {

    // Styles for Navbar
    const styles = {
        navLinkColor: {
            color: 'white'
        },
        navTitleLinkAttributes : {
            color: 'white',
            fontWeight: 'bold'
        },
        buttonAttributes : {
            backgroundColor: 'white'
        }
    }

    return (
        <div>
            <nav style={{ textAlign: 'center' }} className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <a style={ styles.navTitleLinkAttributes } className="p-2 navbar-brand" href="/">Polygon Wallet Dashboard</a>
                    <button style = { styles.buttonAttributes } className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a style={ styles.navLinkColor } className="nav-link" aria-current="page" href="/about">About</a>
                            </li>
                            <li className="nav-item">
                                <a style={ styles.navLinkColor } className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a style={ styles.navLinkColor } className="nav-link" href="/erc20-holdings">ERC20 Token Holdings</a>
                            </li>
                            <li className="nav-item">
                                <a style={ styles.navLinkColor } className="nav-link" href="/erc20-token-prices">ERC20 Token Prices</a>
                            </li>
                            <li className="nav-item">
                                <a style={ styles.navLinkColor } className="nav-link" href="/erc721-holdings">ERC721 Token Holdings</a>
                            </li>
                            <li className="nav-item">
                                <a style={ styles.navLinkColor } className="nav-link" href="/erc721-lookup-page">ERC721 Token Lookups</a>
                            </li>
                            <li className="nav-item">
                                <a style={ styles.navLinkColor } className="nav-link" href="/gas-tracker">Gas Station</a>
                            </li>
                            <li className="nav-item">
                                <a style={ styles.navLinkColor } className="nav-link" href="/matic-price-lookup">Matic Price Lookup</a>
                            </li>
                            <li className="nav-item">
                                <a style={ styles.navLinkColor } className="nav-link" href="/analytics-selection">Wallet/Token Analytics</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;