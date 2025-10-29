import logo from "./assets/Logo.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Artisans from "./pages/Artisans";
import FicheArtisan from "./pages/FicheArtisan";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";


import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<Artisans />} />
        <Route path="/artisans/:id" element={<FicheArtisan />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;