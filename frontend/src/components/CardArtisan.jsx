import { Link } from "react-router-dom";

const CardArtisan = ({ artisan }) => {
    return (
        <Link to={`/artisans/${artisan.id}`} className="card-artisan">
            <h3>{artisan.nom}</h3>
            <p>⭐ {artisan.note}/5</p>
            <p>Spécialité: {artisan.specialites}</p>
            <p>Ville: {artisan.ville}</p>
        </Link>
    );
};

export default CardArtisan;