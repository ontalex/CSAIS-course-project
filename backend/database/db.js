import { createPool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

let pool = createPool({
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    user: process.env.DB_USER
});

export default pool;