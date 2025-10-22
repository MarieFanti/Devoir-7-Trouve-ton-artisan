import express from "express";
import cors from "cors";
import artisanRoutes from "./routes/artisanRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes principales
app.use("/api/artisans", artisanRoutes);
app.use("/api/menu", menuRoutes);

// Route d'accueil
app.get("/", (req, res) => {
  res.send("API Trouver mon artisan");
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: "Page non trouvée" });
});

export default app;
