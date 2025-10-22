import { useEffect, useState } from "react";
import { getMenuCategories } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Form, Container, Spinner } from "react-bootstrap";
import { FaSearch } from "react-icons/fa"
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
        <header>
            <Navbar expand="lg" className="mb-3">
                <Container fluid className="d-flex align-items-center justify-content-between">
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-3">
                        <img src={logo} alt="Trouver mon artisan" height="100" />
                    </Navbar.Brand>

                    <Form
                        className="flex-grow-1 ms-4 position-relative"
                        onSubmit={handleSearch}
                    >
                        <Form.Control
                            type="search"
                            placeholder="Rechercher un artisan"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearch(e);
                            }}
                            style={{
                                borderRadius: "20px",
                                paddingRight: "40px",
                            }}
                        />
                        <FaSearch
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#aaa",
                                cursor: "pointer",
                            }}
                            onClick={handleSearch}
                        />
                    </Form>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-around">
                        <Nav className="d-flex flex-wrap">
                            {loading ? (
                                <Spinner animation="border" size="sm" />
                            ) : categories.length > 0 ? (
                                categories.map((cat, idx) => (
                                    <Nav.Link
                                        key={idx}
                                        as={Link}
                                        to={`/artisans?category=${encodeURIComponent(cat)}`}
                                        className="graph-h3 m-1"
                                    >
                                        {cat}
                                    </Nav.Link>
                                ))
                            ) : (
                                <span className="text-muted">Pas de catégories</span>
                            )}
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
