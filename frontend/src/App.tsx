import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './Components/AboutPage/AboutPage';
import AnalyticsSelectionPage from './Components/AnalyticsSelectionPage/AnalyticsSelectionPage';
import CollectionsSelectionPage from './Components/CollectionsSelectionPage/CollectionsSelectionPage';
import ERC20CollectionPage from './Components/ERC20CollectionInformationPage/ERC20CollectionInformationPage';
import ERC721CollectionPage from './Components/ERC721CollectionInformationPage/ERC721CollectionInformationPage';
import ERC721TokenLookupsPage from './Components/ERC721TokenLookupsPage/ERC721TokenLookupsPage';
import HomePage from './Components/HomePage/HomePage';
import Footer from './Components/Footer/footer';
import GasPricePage from './Components/GasPricePage/GasPricePage';
import MetricsNavbar from './Components/MetricsNavbar/MetricsNavbar';
import Navbar from './Components/Navbar/navbar';
import ERC20TokenPricesPage from './Components/ERC20TokenPricesPage/ERC20TokenPricesPage';
import WalletInformationPage from './Components/WalletInformationPage/WalletInformationPage';
import ERC20TokenHoldingsPage from './Components/ERC20TokenHoldingsPage/ERC20TokenHoldingsPage';
import ERC721TokenHoldingsPage from './Components/ERC721TokenHoldingsPage/ERC721TokenHoldingsPage';
import MaticPriceLookupPage from './Components/MaticPriceLookupPage/MaticPriceLookupPage';
import TransactionsResultsPage from './Components/TransactionsResultsPage/TransactionResultsPage';
import Page404 from './Components/Page404/Page404';

const App: FC = () => {
  return (
    <div className="App">
      <Navbar />
      <MetricsNavbar />
      <Router>
        <Routes>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/analytics-selection" element={<AnalyticsSelectionPage />}></Route>
          <Route path="/erc20-collection-information" element={<ERC20CollectionPage />}></Route>
          <Route path="/erc20-holdings" element={<ERC20TokenHoldingsPage />}></Route>
          <Route path="/erc20-token-prices" element={<ERC20TokenPricesPage />}></Route>
          <Route path="/erc721-collection-information" element={<ERC721CollectionPage />}></Route>
          <Route path="/erc721-lookup-page" element={<ERC721TokenLookupsPage />}></Route>
          <Route path="/erc721-holdings" element={<ERC721TokenHoldingsPage />}></Route>
          <Route path="/collections" element={<CollectionsSelectionPage />}></Route>
          <Route path="/gas-tracker" element={<GasPricePage />}></Route>
          <Route path="/matic-price-lookup" element={<MaticPriceLookupPage />}></Route>
          <Route path="/wallet-analytics-result" element={<TransactionsResultsPage />}></Route>
          <Route path="/wallet-information-page" element={<WalletInformationPage />}></Route>
          <Route path="*" element={<Page404 />}></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;