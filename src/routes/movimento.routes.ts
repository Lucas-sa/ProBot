import { Router } from "express";
import { getAll, getData, getUnique, create, update, clean } from "../controllers/movimento.controller";

const router = Router();

router.get("/getAll", getAll);
router.get("/getData/:mes", getData);
router.get("/getUnique/:id", getUnique);
router.post("/create", create);
router.put("/update/:id", update);
router.delete("/delete/:id", clean);

export default router;
