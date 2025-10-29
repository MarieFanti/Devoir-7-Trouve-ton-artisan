import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import artisanImage from '../assets/artisan.png';



const CardArtisan = ({ artisan }) => {
  return (
    <Link to={`/artisans/${artisan.id}`} className="card-artisan">
      <div className="card-artisan-img-wrapper">
        <img src={artisan.image ? artisan.image : artisanImage} alt={artisan.nom} className="card-artisan-img" />
      </div>
      <div className="card-artisan-info">
        <div className="artisan-name"><h3>{artisan.nom}</h3></div>
        <div className="artisan-job fw-bold ">{artisan.specialites}</div>
        <div className="artisan-location d-flex align-items-center gap-2 fw-bold">
          <FontAwesomeIcon icon={faMapMarkerAlt} color="#0074C7" />
          <span>{artisan.ville}</span>
        </div>
      </div>
      <div className="d-flex gap-1">
        {Array.from({ length: artisan.note }).map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} color="#82B864" />
        ))} 
        <span className="artisan-note-number">{artisan.note}</span>
      </div>
    </Link>
  );
};

export default CardArtisan;