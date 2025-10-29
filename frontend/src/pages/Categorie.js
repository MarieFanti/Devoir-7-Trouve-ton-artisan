import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllArtisans, getArtisansByCategory, searchArtisan } from "../services/api";
import CardArtisan from "../components/CardArtisan";
import { Container, Row, Col, Spinner } from "react-bootstrap";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Categorie = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const category = query.get("category");
  const search = query.get("search");

  useEffect(() => {
    const fetchArtisans = async () => {
      setLoading(true);
      try {
        let res;
        if (search) {
          res = await searchArtisan(search);
        } else if (category) {
          res = await getArtisansByCategory(category);
        } else {
          res = await getAllArtisans();
        }
        setArtisans(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, [category, search]);

  // Titre dynamique
  let title = "Liste des artisans";
  if (search) {
    title = `Résultats pour "${search}"`;
  } else if (category) {
    title = `Artisans en ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }

  return (
    <Container className="my-5 d-flex flex-column align-items-center justify-content-center">
     <h1 className={`hero-title p-3 text-center ${category ? category.toLowerCase() : ""}`}>
  {title}</h1>
  <h3 className="p-3">2. Je choisis mon artisan</h3>
      

      {loading ? (
        <div className="d-flex justify-content-evenly my-5">
          <Spinner animation="border" />
        </div>
      ) : artisans.length === 0 ? (
        <p>Aucun artisan trouvé.</p>
      ) : (
        <Row
  xs={1}
  sm={2}
  md={3}
  lg={4}
  className="g-4 mt-3 justify-content-center align-items-center"
  style={{ width: "100%" }}
>
          {artisans.map(a => (
            <Col key={a.id} className="d-flex justify-content-center" >
              <CardArtisan artisan={a} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Categorie;
