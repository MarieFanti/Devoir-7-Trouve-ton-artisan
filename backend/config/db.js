import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

/** CreatePool permet de gérer plusieurs connexions simultanées */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // nombre max de connexions simultanées
  queueLimit: 0
});

// Test de connexion
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Erreur de connexion à MySQL :", err.message);
  } else {
    console.log("✅ Connecté à la base MySQL !");
    connection.release(); // on libère la connexion immédiatement
  }
});

export default db.promise();