import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_HOST);

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
pool.connect;

export default pool;
