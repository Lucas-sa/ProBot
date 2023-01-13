import { Router } from "express";
import { create, update, clean } from "../controllers/acao.controller";

const router = Router();

// Creete
router.post("/create", create);

// Update
router.put("/update/:id", update);

// Delete
router.delete("/delete/:id", clean);

export default router;
