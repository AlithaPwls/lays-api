import express from "express";
import { createDesign, getAllDesigns, updateDesign, deletedDesign } from "../controllers/designsControllers.js";


const router = express.Router();

//GET: om alle designs op te halen
router.get("/", getAllDesigns);

//POST: om een nieuw design aan te maken
router.post("/", createDesign);

//PUT: om een bestaand design aan te passen
router.put("/:id", updateDesign);

//DELETE: om een design te verwijderen
router.delete("/:id", deletedDesign);


export default router;
