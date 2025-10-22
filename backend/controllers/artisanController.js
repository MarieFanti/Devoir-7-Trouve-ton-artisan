import Artisan from "../models/Artisan.js";
import { sendEmail } from "../utils/mailer.js";

export const getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.getAll();
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getArtisanById = async (req, res) => {
  try {
    const artisan = await Artisan.getById(req.params.id);
    if (!artisan) return res.status(404).json({ message: "Artisan non trouvé" });
    res.json(artisan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getArtisansByCategory = async (req, res) => {
  try {
    const artisans = await Artisan.getByCategory(req.params.category);
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchArtisan = async (req, res) => {
  try {
    const { name } = req.query;
    const artisans = await Artisan.searchByName(name);
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTopArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.getTop();
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Formulaire de contact
export const contactArtisan = async (req, res) => {
  const { artisanId, name, email, subject, message } = req.body;

  try {
    const artisan = await Artisan.getById(artisanId);
    if (!artisan) return res.status(404).json({ message: "Artisan non trouvé" });

    await sendEmail({
      to: artisan.email,
      subject: `Message de ${name}: ${subject}`,
      text: message,
      html: `<p>${message}</p><p>De: ${name} (${email})</p>`,
    });

    res.json({ message: "Email envoyé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};