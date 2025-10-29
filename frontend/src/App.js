import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categorie from "./pages/Categorie"; // Page des artisans filtrés
import FicheArtisan from "./pages/FicheArtisan";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllArtisans from "./pages/AllArtisans";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<Categorie />} /> {/* Page filtrée par catégorie */}
        <Route path="/artisans/tous" element={<AllArtisans />} /> {/* Tous les artisans */}
        <Route path="/artisans/:id" element={<FicheArtisan />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
