import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

import { authRouter } from "./routers/auth.routes.js";

dotenv.config();

const app = express();
const PORT = 8000 || process.env.SERVER_PORT;

app.use(cors());
app.use(express.json())
app.use( "/api", [ authRouter ] );

const start = () => {
        try {
                app.listen(PORT, () => console.log(`Server start on http://localhost:${PORT}/api`))
        } catch (error) {
                console.log(error);
        }
}

start();