import pool from '../config/db.js';

export class Slot {

    static async getFloors(mall_id) {
        const [rows] = await pool.query('SELECT DISTINCT floor_no FROM slots WHERE mall_id = ?', [mall_id]);
        return rows.map(row => row.floor_no);
    }

    static async getSlotsByFloor(mall_id, floor_no) {
        const [rows] = await pool.query('SELECT slot_no FROM slots WHERE mall_id = ? AND floor_no = ?', [mall_id, floor_no]);
        return rows.map(row => row.slot_no);
    }
    
    static async create(mall_id, floor_no, slot_no, is_available) {
        const id = crypto.randomBytes(16).toString('hex');
        await pool.query(
            `INSERT INTO slots (id, mall_id, floor_no, slot_no, is_available) VALUES (?,?,?,?,?)`,
            [id, mall_id, floor_no, slot_no, is_available]
        );
        return { id };
    }

    static async isAvailable(id) {
        const [row] = await pool.query('SELECT is_available FROM slots WHERE id = ?', [id]);
        return row[0].is_available === 1;
    }

    static async update(id, is_available) {
        await pool.query('UPDATE slots SET is_available = ? WHERE id = ?', [is_available, id]);
    }

    static async delete(id) {
        await pool.query('DELETE FROM slots WHERE id = ?', [id]);
    }
}

export default Slot;
