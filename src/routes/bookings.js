import bookings from '../controllers/bookings.js';
import { Router } from 'express';
const router = Router();

router.post('/', bookings.bookSlot);
router.delete('/', bookings.cancelBooking);

export default router;
