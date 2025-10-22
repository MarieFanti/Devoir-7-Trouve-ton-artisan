import express from "express";
import { getMenuCategories } from "../controllers/menuController.js";

const router = express.Router();

/** Route pour récupérer les catégories du menu*/ 
router.get("/", getMenuCategories);

export default router;