import { useEffect, useState } from "react";
import { getTopArtisans } from "../services/api";
import CardArtisan from "../components/CardArtisan";

const Home = () => {
  const [topArtisans, setTopArtisans] = useState([]);

  useEffect(() => {
    getTopArtisans()
      .then(res => setTopArtisans(res.data))
      .catch(err => console.error("Erreur top artisans:", err));
  }, []);

  return (
    <div>
      <h1>Comment trouver mon artisan ?</h1>
      <ol>
        <li>Choisir la catégorie d’artisanat dans le menu.</li>
        <li>Choisir un artisan.</li>
        <li>Le contacter via le formulaire de contact.</li>
        <li>Une réponse sera apportée sous 48h.</li>
      </ol>

      <h2>Artisans du mois</h2>
      <div className="top-artisans">
        {topArtisans.map(artisan => (
          <CardArtisan key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </div>
  );
};

export default Home;
