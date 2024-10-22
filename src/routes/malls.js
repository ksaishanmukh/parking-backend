import malls from "../controllers/malls.js";
import express from "express";
const router = express();

router.get("/locations", malls.getAll);
router.get("/", malls.getAllByLocation);
router.post("/", malls.create);
router.put("/", malls.update);
router.delete("/", malls.delete);

export default router;
