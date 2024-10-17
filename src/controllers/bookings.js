import Booking from "../models/bookings.js";

export default {
    async bookSlot(req, res) {
        try {
            const { userId, slotId, startTime, duration } = req.body;
            const booking = await Booking.book(userId, slotId, startTime, duration, 'booked');
            res.send(booking);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async cancelBooking(req, res) {
        try {
            await Booking.update(req.params.id, 'cancelled');
            res.send({ message: 'Booking cancelled successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}
