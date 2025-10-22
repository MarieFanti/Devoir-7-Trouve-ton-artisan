import express from "express";
import {
  getAllArtisans,
  getArtisanById,
  getArtisansByCategory,
  searchArtisan,
  getTopArtisans,
  contactArtisan,
} from "../controllers/artisanController.js";

const router = express.Router();

router.get("/", getAllArtisans);
router.get("/top", getTopArtisans);
router.get("/search", searchArtisan);
router.get("/category/:category", getArtisansByCategory);
router.get("/:id", getArtisanById);
router.post("/contact", contactArtisan);

export default router;