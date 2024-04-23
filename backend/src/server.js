import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import auth_routs from "./routes/v1/auth.routes.js";
import groups_routs from "./routes/v1/groups.routes.js";
import lessons_routs from "./routes/v1/lessons.routes.js";
import order_routs from "./routes/v1/order.routes.js";
import schedule_routs from "./routes/v1/schedule.routes.js";
import students_routs from "./routes/v1/students.routes.js";
import teachers_routs from "./routes/v1/teachers.routes.js";
import users_routs from "./routes/v1/users.routes.js";
import roles_routs from "./routes/v1/roles.routes.js";
import logbook_routs from "./routes/v1/logbook.routes.js";

import { db_pool } from "./helpers/database.js";
import { verifyToken } from "./helpers/middleware/auth.middleware.js";
import older_routs from "./routes/v1/olders.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', auth_routs)
app.use('/api/v1/groups', verifyToken, groups_routs)
app.use('/api/v1/lessons', verifyToken, lessons_routs)
app.use('/api/v1/order', verifyToken, order_routs)
app.use('/api/v1/schedule', verifyToken, schedule_routs)
app.use('/api/v1/students', verifyToken, students_routs)
app.use('/api/v1/users', verifyToken, users_routs)
app.use('/api/v1/roles', verifyToken, roles_routs)
app.use('/api/v1/teachers', verifyToken, teachers_routs);
app.use('/api/v1/logbook', verifyToken, logbook_routs);
app.use('/api/v1/olders', verifyToken, older_routs);
app.use('/api/v1/reports', verifyToken, order_routs);

app.listen(PORT, "192.168.1.69", () => {
    console.log(`===== SERVER to START =====`);
});