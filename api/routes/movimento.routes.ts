import { Router } from "express";
import { getTodas, getResumo, getEntradas, getDespesas, getUnique, create, update, clean } from "../controllers/movimento.controller";

const router = Router();

// Get
router.get("/getTodas", getTodas);
router.get("/getResumo/:mes", getResumo);
router.get("/getEntradas/:mes", getEntradas);
router.get("/getDespesas/:mes", getDespesas);
router.get("/getUnique/:id", getUnique);

// Creete
router.post("/create", create);

// Update
router.put("/update/:id", update);

// Delete
router.delete("/delete/:id", clean);

export default router;
