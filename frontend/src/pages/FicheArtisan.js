import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtisanById, contactArtisan } from "../services/api";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactStars from "react-stars";
import artisanImage from '../assets/artisan.png';
import { Helmet } from "react-helmet";

const FicheArtisan = () => {
  const { id } = useParams();   // --- Récupère l'ID de l'artisan depuis l'URL ---
  const [artisan, setArtisan] = useState(null);  // --- État pour stocker les informations de l'artisan ---
  const [formData, setFormData] = useState({  // -- État pour stocker les données du formulaire de contact ---
    name: "", 
    email: "",
    subject: "",
    message: "",
  });

  // --- useEffect pour charger les infos de l'artisan à l'ouverture de la page ---
  useEffect(() => {
    getArtisanById(id)
      .then(res => setArtisan(res.data))
      .catch(err => console.error(err));
  }, [id]);

    // --- Met à jour l'état formData à chaque modification d'un champ du formulaire ---
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   // --- Fonction appelée lors de l'envoi du formulaire ---
  const handleSubmit = async e => {
    e.preventDefault(); // Empêche le rechargement de la page
    try { 
      // Envoie les données à l'API pour contacter l'artisan
      await contactArtisan({ artisanId: id, ...formData });
      alert("Message envoyé !");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi.");
    }
  };

  if (!artisan) return <p>Chargement...</p>;

   // --- Gestion de la note de l'artisan ---
  let note = Number(artisan.note); 
  if (isNaN(note)) note = 0;
  note = Math.max(0, Math.min(5, note));

  return (
    <Container className="fiche-container">
       <Helmet>
        <title>{artisan.nom} - Artisan {artisan.specialites} | MonSite</title>
        <meta
          name="description"
          content={`Découvrez ${artisan.nom}, spécialiste en ${artisan.specialites} basé à ${artisan.ville}. Note moyenne : ${note.toFixed(1)}.`}
        />
      </Helmet>
      <Row className="justify-content-center g-4">
        {/* Carte artisan */}
        <Col md={6} lg={5}>
          <Card className="artisan-card h-100 p-3">
            <img
              src={artisan.image ? artisan.image : artisanImage}
              alt={artisan.nom}
              className="card-artisan-img2"
            />
            <h3 className="artisan-name">{artisan.nom}</h3>
            <p className="artisan-specialty">{artisan.specialites}</p>

            <div className="artisan-location d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>{artisan.ville}</span>
            </div>

            {/* Étoiles avec demi-étoiles */}
            <div className="artisan-rating mt-2 d-flex align-items-center gap-2">
              <ReactStars
                count={5}
                value={note}
                size={24}
                edit={false}
                half={true}
                color1="#ccc"
                color2="#82B864"
              />
              <span className="fw-bold">{note.toFixed(1)}</span>
            </div>

            <hr style={{ width: "100%", borderColor: "#00497C" }} />

            <div className="artisan-about">{artisan.propos}</div>

            {artisan.site_web && (
              <a
                href={artisan.site_web}
                target="_blank"
                rel="noreferrer"
                className="artisan-site"
              >
                {artisan.site_web}
              </a>
            )}
          </Card>
        </Col>

        {/* Formulaire */}
        <Col md={6} lg={5}>
          <Card className="contact-card h-100">
            <Card.Body>
              <h4 className="contact-title">
                Pour toute demande d’information ou devis, remplissez le formulaire ci-dessous.
              </h4>

              <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <Form.Group>
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="btn-contact">
                  Envoyer
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FicheArtisan;
