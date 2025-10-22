import db from "../config/db.js";

class Artisan {
  /** 🔹 Récupérer tous les artisans */
  static async getAll() {
    try {
      const [rows] = await db.query("SELECT * FROM artisans ORDER BY nom ASC");
      return rows;
    } catch (err) {
      throw new Error("Erreur lors de la récupération des artisans : " + err.message);
    }
  }

  /** 🔹 Récupérer un artisan par son ID */
  static async getById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM artisans WHERE id = ?", [id]);
      return rows[0];
    } catch (err) {
      throw new Error("Erreur lors de la récupération de l’artisan : " + err.message);
    }
  }

  /** 🔹 Récupérer les artisans par catégorie */
  static async getByCategory(category) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM artisans WHERE categorie = ? ORDER BY nom ASC",
        [category]
      );
      return rows;
    } catch (err) {
      throw new Error("Erreur lors de la récupération des artisans par catégorie : " + err.message);
    }
  }

  /** 🔹 Recherche par nom (insensible à la casse) */
  static async searchByName(name) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM artisans WHERE LOWER(nom) LIKE LOWER(?) ORDER BY nom ASC",
        [`%${name}%`]
      );
      return rows;
    } catch (err) {
      throw new Error("Erreur lors de la recherche d’artisans : " + err.message);
    }
  }

  /** 🔹 Top 3 artisans du mois */
  static async getTop() {
    try {
      const [rows] = await db.query(
        "SELECT * FROM artisans WHERE top = 1 ORDER BY note DESC LIMIT 3"
      );
      return rows;
    } catch (err) {
      throw new Error("Erreur lors de la récupération des top artisans : " + err.message);
    }
  }
}

export default Artisan;
