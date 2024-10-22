import pool from '../config/db.js';

class User {
    static async create(name, phone) {
        const id = 1000000 + Math.floor(Math.random() * 1000000);
        await pool.query(
            `INSERT INTO users (id, name, phone) VALUES (?,?,?)`,
            [id, name, phone]
        );
        return { id };
    }

    static async update(id, name, phone) {
        await pool.query('UPDATE users SET name = ?, phone = ? WHERE id = ?', [name, phone, id]);
    }

    static async delete(id) {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
    }
}

export default User;
