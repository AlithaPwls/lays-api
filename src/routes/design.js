import express from "express";
import { 
  getAllDesigns,
  createDesign,
  updateDesign,
  deleteDesign
} from "../controllers/designsControllers.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllDesigns);
router.post("/", authMiddleware, createDesign);
router.put("/:id", authMiddleware, updateDesign);
router.delete("/:id", authMiddleware, deleteDesign);

export default router;
