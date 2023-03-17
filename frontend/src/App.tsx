import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './Components/AboutPage/AboutPage';
import Navbar from './Components/Navbar/Navbar';
import MetricsNavbar from './Components/MetricsNavbar/MetricsNavbar';
import Footer from './Components/Footer/footer';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <MetricsNavbar />
      <Router>
        <Routes>
          <Route path="/about" element={<AboutPage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;