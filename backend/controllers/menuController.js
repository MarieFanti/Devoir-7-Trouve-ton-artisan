import db from "../config/db.js";

/**Récupère toutes les catégories uniques pour le menu */
export const getMenuCategories = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT DISTINCT categorie FROM artisans ORDER BY categorie ASC"
    );
    res.json(rows); // Exemple : [{ categorie: "Bâtiment" }, { categorie: "Services" }, ...]
  } catch (err) {
    console.error("Erreur récupération menu :", err.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
