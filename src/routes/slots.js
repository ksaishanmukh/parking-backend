import slots from "../controllers/slots.js";
import { Router } from "express";
const router = Router();

router.get('/floors', slots.getFloors);
router.get('/avail', slots.isAvailable);
router.get('/', slots.getSlotsByFloor);
router.post('/', slots.create);
router.put('/', slots.update);
router.delete('/', slots.delete);

export default router;