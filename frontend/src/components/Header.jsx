import { useEffect, useState } from "react";
import { getMenuCategories } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Form, Button, Spinner } from "react-bootstrap";
import logo from "../assets/Logo.png";



const Header = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getMenuCategories();
                // Vérifie que la réponse est un tableau
                if (Array.isArray(res.data)) {
                    setCategories(res.data.map(item => item.categorie));
                } else {
                    console.error("Format de données inattendu:", res.data);
                }
            } catch (err) {
                console.error("Erreur menu:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        navigate(`/artisans?search=${encodeURIComponent(search)}`);
        setSearch("");
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mb-3">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={logo}
                        alt="Trouver mon artisan"
                        height="40"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {loading ? (
                            <Spinner animation="border" size="sm" />
                        ) : categories.length > 0 ? (
                            categories.map((cat, idx) => (
                                <Nav.Link
                                    key={idx}
                                    as={Link}
                                    to={`/artisans?category=${encodeURIComponent(cat)}`}
                                >
                                    {cat}
                                </Nav.Link>
                            ))
                        ) : (
                            <span className="text-muted">Pas de catégories</span>
                        )}
                    </Nav>

                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Rechercher un artisan"
                            className="me-2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant="outline-primary" type="submit">
                            Rechercher
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;