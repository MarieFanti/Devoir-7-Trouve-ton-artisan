import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import artisanImage from '../assets/artisan.png';

const CardArtisan = ({ artisan }) => {
  let note = Number(artisan.note);
  if (isNaN(note)) note = 0;
  note = Math.max(0, Math.min(5, note));

  return (
    <Link to={`/artisans/${artisan.id}`} className="card-artisan">

      <div className="card-artisan-img-wrapper">
        <img
          src={artisan.image ? artisan.image : artisanImage}
          alt={artisan.nom}
          className="card-artisan-img"
        />
      </div>

      <div className="card-artisan-info">
        <div className="artisan-name"><h3>{artisan.nom}</h3></div>
        <div className="artisan-job fw-bold">{artisan.specialites}</div>
        <div className="artisan-location d-flex align-items-center gap-2 fw-bold">
          <FontAwesomeIcon icon={faMapMarkerAlt} color="#0074C7" />
          <span>{artisan.ville}</span>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 mt-2">
        <ReactStars
          count={5}
          value={note}
          size={20}
          edit={false}
          half={true}
          color2="#82B864"
          color1="#ccc"
        />
        <span className="artisan-note-number fw-bold">{note.toFixed(1)}</span>
      </div>
    </Link>
  );
};

export default CardArtisan;