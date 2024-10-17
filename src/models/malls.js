import pool from '../config/db.js';

class Mall {
    static async getAllLocations() {
        const [rows] = await pool.query('SELECT DISTINCT location FROM malls');
        return rows.map(row => row.location);
    }

    static async getAllByLocation(location) {
        const [rows] = await pool.query('SELECT id, name FROM malls WHERE location = ?', [location]);
        return rows;
    }

    static async create(admin_id, name, location) {
        const id = crypto.randomBytes(16).toString('hex');
        await pool.query(
            `INSERT INTO malls (id, admin_id, name, location) VALUES (?,?,?,?)`,
            [id, admin_id, name, location]
        );
        return { id };
    }

    static async update(id, name, location) {
        await pool.query('UPDATE malls SET name = ?, location = ? WHERE id = ?', [name, location, id]);
    }

    static async delete(id) {
        await pool.query('DELETE FROM malls WHERE id = ?', [id]);
    }
}

export default Mall;
