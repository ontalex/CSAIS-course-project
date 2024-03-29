import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

console.log({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: process.env.DB_PORT,
});

export const db_pool = mysql2.createPool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        port: process.env.DB_PORT,
    }
);