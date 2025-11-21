import express from "express";
import { createDesign, getAllDesigns } from "../controllers/designsControllers.js";


const router = express.Router();

//GET: om alle designs op te halen
router.get("/", getAllDesigns);

//POST: om een nieuw design aan te maken
router.post("/", createDesign);


export default router;
