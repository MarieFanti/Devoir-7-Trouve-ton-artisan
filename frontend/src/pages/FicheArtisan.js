import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtisanById, contactArtisan } from "../services/api";

const FicheArtisan = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    getArtisanById(id)
      .then(res => setArtisan(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await contactArtisan({ artisanId: id, ...formData });
      alert("Message envoyé !");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi.");
    }
  };

  if (!artisan) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{artisan.nom}</h1>
      <p>⭐ {artisan.note}/5</p>
      <p>Spécialité: {artisan.specialites}</p>
      <p>Ville: {artisan.ville}</p>
      <p>A propos: {artisan.propos}</p>
      {artisan.site_web && (
        <p>
          Site web: <a href={artisan.site_web}>{artisan.site_web}</a>
        </p>
      )}

      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Votre nom"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="subject"
          placeholder="Objet"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default FicheArtisan;