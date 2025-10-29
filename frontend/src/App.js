import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categorie from "./pages/Categorie"; // Page des artisans filtrés
import FicheArtisan from "./pages/FicheArtisan";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllArtisans from "./pages/AllArtisans";
import SiteEnConstruction from "./pages/SiteEnConstruction";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/categorie/:nom" element={<Categorie />} />
        <Route path="/artisans/tous" element={<AllArtisans />} /> 
        <Route path="/artisans/:id" element={<FicheArtisan />} />
         <Route path="/mentions-legales" element={<SiteEnConstruction />} />
        <Route path="/donnees-personnelles" element={<SiteEnConstruction />} />
        <Route path="/accessibilite" element={<SiteEnConstruction />} />
        <Route path="/cookies" element={<SiteEnConstruction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
