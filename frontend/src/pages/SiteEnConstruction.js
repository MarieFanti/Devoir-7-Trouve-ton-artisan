import React from "react";
import { Container } from "react-bootstrap";

const SiteEnConstruction = () => {
  return (
    <Container className="text-center py-5">
      <h1 className="display-5 fw-bold mb-4">🚧 Site en construction 🚧</h1>
      <p className="lead text-muted">
        Cette page est actuellement en cours de création. Revenez bientôt !
      </p>
    </Container>
  );
};

export default SiteEnConstruction;