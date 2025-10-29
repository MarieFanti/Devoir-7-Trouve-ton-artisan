import { useEffect, useState } from "react";
import { getTopArtisans } from "../services/api";
import CardArtisan from "../components/CardArtisan";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const [topArtisans, setTopArtisans] = useState([]);

  useEffect(() => {
    getTopArtisans()
      .then(res => setTopArtisans(res.data))
      .catch(err => console.error("Erreur top artisans:", err));
  }, []);

  return (
    <div>
      <div className="hero mt-5 d-flex flex-column align-items-center justify-content-start">
        <h1 className="hero-title p-3  text-center">
    Comment trouver mon artisan ?
  </h1>

  <div className="hero-steps p-2 d-flex flex-column text-center justify-content-center">
    <ol>
    <li>Choisir la catégorie d’artisanat dans le menu.</li>
    <li>Choisir un artisan.</li>
    <li>Le contacter via le formulaire de contact</li>
    <li>Une réponse sera apportée sous 48h.</li>
    </ol>

  </div>
</div>
<Container className="artisans-section d-flex flex-column align-items-center justify-content-center">
      
      <div className="separator"></div>

      <h2 className="artisans-title text-center">Les artisans du mois</h2>

<Row className="top-artisans justify-content-center g-4">
  {topArtisans.map((artisan) => (
    <Col xs="auto" key={artisan.id} className="d-flex justify-content-center">
      <CardArtisan artisan={artisan} />
    </Col>
  ))}
</Row>
    </Container>
    </div>
  );
};

export default Home;
