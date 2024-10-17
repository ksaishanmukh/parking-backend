import pool from '../config/db.js';

class Booking {
    static async book(userId, slotId, startTime, duration) {
        const id = crypto.randomBytes(16).toString('hex');
        await pool.query(
            `INSERT INTO bookings (id, user_id, slot_id, start_time, duration) VALUES (?,?,?,?,?)`,
            [id, userId, slotId, startTime, duration]
        );
        return { id };
    }

    static async update(id, status) {
        await pool.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
    }

    async getUserByBookingId(req, res) {
        try {
            const { bookingId } = req.query;
            const [rows] = await pool.query(
                'SELECT users.id, users.name, users.phone, slots.id as slot_id, slots.floor_no, slots.slot_no\
                FROM bookings\
                JOIN users ON bookings.user_id = users.id\
                JOIN slots ON bookings.slot_id = slots.id\
                JOIN malls ON slots.mall_id = malls.id\
                WHERE bookings.id = ? AND malls.admin_id = ?',
                [bookingId, req.adminId]
            );
            if (rows.length === 0) {
                return res.status(403).send({ error: 'Access denied' });
            }
            res.send(rows[0]);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

}

export default Booking;
