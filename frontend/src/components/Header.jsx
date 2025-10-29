
import { useEffect, useState } from "react";
import { getMenuCategories } from "../services/api"; 
import { Link, useNavigate } from "react-router-dom"; 
import { Navbar, Nav, Form, Container, Spinner } from "react-bootstrap"; 
import { FaSearch } from "react-icons/fa"; 
import logo from "../assets/Logo.png"; 


const Header = () => {

  const [categories, setCategories] = useState([]); // Stocke les catégories du menu
  const [loading, setLoading] = useState(true);     // Indique si les données sont en cours de chargement
  const [search, setSearch] = useState("");         // Gère la valeur de la barre de recherche

  const navigate = useNavigate(); // Permet de rediriger l'utilisateur vers une autre page

  // --- Chargement automatique des catégories au montage du composant ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Appel de l’API pour récupérer la liste des catégories
        const res = await getMenuCategories();

        // Vérifie que la réponse contient bien un tableau
        if (Array.isArray(res.data)) {
          // Extrait uniquement le champ "categorie" et filtre les valeurs invalides
          const validCats = res.data
            .map(item => item?.categorie) //  évite les erreurs si item est null/undefined
            .filter(cat => typeof cat === "string" && cat.trim() !== ""); // garde uniquement les chaînes non vides
          
          // Met à jour l’état avec les catégories valides
          setCategories(validCats);
        } else {
          console.error("Format de données inattendu:", res.data);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories(); 
  }, []);

  // --- Fonction de gestion de la recherche ---
  const handleSearch = e => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (!search.trim()) return; // Ignore si le champ est vide
  // Redirige vers la page des artisans avec un paramètre de recherche
    navigate(`/artisans?search=${encodeURIComponent(search.trim())}`);
    // Réinitialise le champ après la recherche
    setSearch("");
  };


  return (
    <header>
      {/* Barre de navigation Bootstrap */}
      <Navbar expand="lg" className="py-3">
        <Container fluid className="d-flex align-items-center justify-content-between">

          {/* Logo du site (renvoie à la page d’accueil) */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-3">
            <img src={logo} alt="Trouver mon artisan" height="100" />
          </Navbar.Brand>

          {/* Champ de recherche */}
          <Form
            className="flex-grow-1 ms-4 position-relative"
            onSubmit={handleSearch} // Lance la recherche lors du submit
          >
            <Form.Control
              type="search"
              placeholder="Rechercher un artisan"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Met à jour la valeur tapée
              style={{
                borderRadius: "20px",
                paddingRight: "40px", 
              }}
            />

            {/* Icône de loupe cliquable */}
            <FaSearch
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#aaa",
                cursor: "pointer",
              }}
              onClick={handleSearch} // Lance la recherche au clic
            />
          </Form>

          {/* Bouton pour ouvrir/fermer le menu sur mobile */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Contenu du menu déroulant */}
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-around">
            <Nav className="d-flex flex-wrap align-items-center text-center">

              {/* Si le menu est encore en chargement */}
              {loading ? (
                <Spinner animation="border" size="sm" />

              ) : categories.length > 0 ? (
                // Si des catégories sont disponibles, on les affiche
                categories.map((cat, idx) => {
                  const slug = encodeURIComponent(cat.toLowerCase()); 
                  return (
                    <Nav.Link
                      key={idx}
                      as={Link}
                      to={`/categorie/${slug}`} 
                      className="header-title m-1"
                    >
                      {cat} {/* Nom de la catégorie affiché */}
                    </Nav.Link>
                  );
                })
              ) : (<span className="text-muted">Pas de catégories</span>)}
              <Nav.Link as={Link} to="/artisans/tous" className="m-1 header-title">
                Tous les artisans
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
