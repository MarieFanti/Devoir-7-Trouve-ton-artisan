import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-style mt-5 border-top">
      <Container>
        <Row className="align-items-start justify-content-center justify-content-md-between pt-2 gap-4 text-center text-md-start">
          <Col xs={12} md={3} className="pt-5">
            <img src={logo} alt="Trouver mon artisan" height="120" />
          </Col>
          <Col xs={12} md={3}>
            <h6 className="fw-bold mb-3 text-uppercase">Adresse</h6>
            <p className="mb-1">101 cours Charlemagne</p>
            <p className="mb-1">CS 20033</p>
            <p className="mb-1">69269 LYON CEDEX 02</p>
            <p className="mb-1">France</p>
            <p className="mt-2">📞 +33 (0)4 26 73 40 00</p>
          </Col>

          <Col xs={12} md={3} className="ms-md-5">
            <h6 className="fw-bold mb-3 text-uppercase">Informations</h6>
            <ul className="list-unstyled">
              <li><Link to="/mentions-legales" className="lien text-decoration-none">Mentions légales</Link></li>
              <li><Link to="/donnees-personnelles" className="lien text-decoration-none">Données personnelles</Link></li>
              <li><Link to="/accessibilite" className="lien text-decoration-none">Accessibilité</Link></li>
              <li><Link to="/cookies" className="lien -decoration-none">Cookies</Link></li>
            </ul>
          </Col>

        </Row>

        <hr className="my-4" />

        <Row>
          <Col className="text-center text-muted">
            <small>&copy; {new Date().getFullYear()} Trouver mon artisan — Tous droits réservés.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
