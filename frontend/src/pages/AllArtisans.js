import { useEffect, useState } from "react";
import { Helmet } from "react-helmet"; 
import { Accordion, Spinner, Container, Row, Col } from "react-bootstrap";
import { getArtisansByCategory } from "../services/api";
import CardArtisan from "../components/CardArtisan";

const AllArtisans = () => {
   // --- État pour stocker les artisans par catégorie ---
  const [categoriesData, setCategoriesData] = useState({
    alimentation: [],
    batiment: [],
    fabrication: [],
    services: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const [alim, bati, fab, serv] = await Promise.all([
          getArtisansByCategory("Alimentation"),
          getArtisansByCategory("Bâtiment"),
          getArtisansByCategory("Fabrication"),
          getArtisansByCategory("Services"),
        ]);

        setCategoriesData({
          alimentation: alim.data,
          batiment: bati.data,
          fabrication: fab.data,
          service: serv.data,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des artisans :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  return (
    <Container className="all-artisans-container my-5 d-flex flex-column align-items-center">
       <Helmet>
        <title>Liste des artisans par catégorie - MonSite</title>
        <meta name="description" content="Découvrez tous nos artisans classés par catégorie : Alimentation, Bâtiment, Fabrication, Services."
        />
      </Helmet>
          {/* --- En-tête de la page --- */}
      <div className="d-flex flex-column align-items-center justify-content-start">
        <h1 className="hero-title p-3  text-center">Les catégories d’artisanat</h1>
        <h3 className="hero-steps p-3">
          1. Je choisis une catégorie d’artisanat.<br />2. Je choisis mon artisan.
        </h3>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <Spinner animation="border" />
        </div>
      ) : (
        // --- Accordéon pour chaque catégorie ---
        <Accordion defaultActiveKey="0" alwaysOpen>
            
          {/* Alimentation */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>Alimentation</Accordion.Header>
            <Accordion.Body>
              <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center align-items-center">
                {categoriesData.alimentation.length > 0 ? (
                  categoriesData.alimentation.map(a => (
                    <Col key={a._id} className="d-flex justify-content-center">
                      <CardArtisan artisan={a} />
                    </Col>
                  ))
                ) : (
                  <p className="text-muted">Aucun artisan trouvé.</p>
                )}
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          {/*  Bâtiment */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Bâtiment</Accordion.Header>
            <Accordion.Body>
              <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center align-items-center">
                {categoriesData.batiment.length > 0 ? (
                  categoriesData.batiment.map(a => (
                    <Col key={a._id} className="d-flex justify-content-center">
                      <CardArtisan artisan={a} />
                    </Col>
                  ))
                ) : (
                  <p className="text-muted">Aucun artisan trouvé.</p>
                )}
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          {/* Fabrication */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>Fabrication</Accordion.Header>
            <Accordion.Body>
              <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center align-items-center">
                {categoriesData.fabrication.length > 0 ? (
                  categoriesData.fabrication.map(a => (
                    <Col key={a._id} className="d-flex justify-content-center">
                      <CardArtisan artisan={a} />
                    </Col>
                  ))
                ) : (
                  <p className="text-muted">Aucun artisan trouvé.</p>
                )}
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          {/* Service */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>Service</Accordion.Header>
            <Accordion.Body>
              <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center align-items-center">
                {categoriesData.service.length > 0 ? (
                  categoriesData.service.map(a => (
                    <Col key={a._id} className="d-flex justify-content-center">
                      <CardArtisan artisan={a} />
                    </Col>
                  ))
                ) : (
                  <p className="text-muted">Aucun artisan trouvé.</p>
                )}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </Container>
  );
};

export default AllArtisans;