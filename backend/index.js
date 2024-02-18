import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 8000 || process.env.SERVER_PORT;

app.use(cors());

const start = () => {
        try {
                app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
        } catch (error) {
                console.log(error);
        }
}

start();