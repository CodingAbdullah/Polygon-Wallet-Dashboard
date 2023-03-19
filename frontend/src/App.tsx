import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './Components/AboutPage/AboutPage';
import GasPricePage from './Components/GasPricePage/GasPricePage';
import MetricsNavbar from './Components/MetricsNavbar/MetricsNavbar';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/footer';
import AnalyticsSelectionPage from './Components/AnalyticsSelectionPage/AnalyticsSelectionPage';
import CollectionsSelectionPage from './Components/CollectionsSelectionPage/CollectionsSelectionPage';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <MetricsNavbar />
      <Router>
        <Routes>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/analytics-selection" element={<AnalyticsSelectionPage />}></Route>
          <Route path="/collections" element={<CollectionsSelectionPage />}></Route>
          <Route path="/gas-tracker" element={<GasPricePage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;