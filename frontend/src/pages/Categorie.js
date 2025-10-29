
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { getArtisansByCategory } from "../services/api"; 
import { Container, Row, Col, Spinner } from "react-bootstrap"; 
import CardArtisan from "../components/CardArtisan"; 
import { Helmet } from "react-helmet"; 

const Categorie = () => {


  const { nom } = useParams();   // Récupère le paramètre "nom" depuis l’URL (ex : /categorie/alimentation → nom = "alimentation")
  const [artisans, setArtisans] = useState([]); // Liste des artisans récupérés depuis l’API
  const [loading, setLoading] = useState(true); // Indique si les données sont en cours de chargement

  // --- Dictionnaire de correspondances ---
  // Permet de faire le lien entre le slug d’URL et le vrai nom de la catégorie 
  const correspondances = {
    alimentation: "Alimentation",
    batiment: "Bâtiment",
    fabrication: "Fabrication",
    services: "Services",
    service: "Services", //  pour éviter les erreurs singulier/pluriel
  };

  // Cherche la version lisible du nom de catégorie
  const nomLisible = correspondances[nom?.toLowerCase()] || nom;


  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        // Appel API pour récupérer les artisans de la catégorie
        const res = await getArtisansByCategory(nomLisible);
        setArtisans(res.data || []);
      } catch (err) {
        console.error("Erreur lors du chargement des artisans :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans(); 
  }, [nomLisible]); 

  return (
    <Container className="categorie-container my-5 d-flex flex-column align-items-center">
      
      {/* Balises SEO dynamiques */}
      <Helmet>
        <title>Artisans en {nomLisible} - MonSite</title>
        <meta
          name="description"
          content={`Découvrez nos artisans spécialisés en ${nomLisible}. Trouvez le professionnel idéal pour vos besoins en ${nomLisible.toLowerCase()}.`}
        />
      </Helmet>

      {/* Titre principal de la page */}
      <h1 className="hero-title text-center mb-4">
        Artisans en {nomLisible}
      </h1>
      {loading ? (  <Spinner animation="border" />) : artisans.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
          {artisans.map((a) => (
            <Col key={a._id} className="d-flex justify-content-center">
              <CardArtisan artisan={a} /> 
            </Col>
          ))}
        </Row>
      ) : (
        // Si aucun artisan trouvé
        <p className="text-muted text-center mt-3">
          Aucun artisan trouvé pour la catégorie {nomLisible}.
        </p>
      )}
    </Container>
  );
};

export default Categorie;
