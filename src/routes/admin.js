import express from "express";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { authRequired } from "../middleware/authMiddleware.js";
import { deleteUser, deleteDesignAdmin, getAllUsers } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", authRequired, adminOnly, getAllUsers);
router.delete("/users/:id", authRequired, adminOnly, deleteUser);
router.delete("/designs/:id", authRequired, adminOnly, deleteDesignAdmin);

export default router;
