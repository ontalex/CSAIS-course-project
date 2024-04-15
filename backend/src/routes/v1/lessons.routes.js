import { Router } from 'express';
import { verifyRole } from "../../helpers/middleware/role.middleware.js";
import lessonsController from '../../controllers/v1/lessons.controller.js';

const lessons_routs = Router();

lessons_routs.get("/all", verifyRole("staff", "tutor", "older"), lessonsController.get_all_lessons);
lessons_routs.get("/find", verifyRole("staff", "tutor", "older"), lessonsController.get_find_lessons);
lessons_routs.get("/find/id", verifyRole("staff"), lessonsController.get_find_id_lessons);
lessons_routs.post("/add", verifyRole("staff", "tutor", "older"), lessonsController.post_add_lessons);
lessons_routs.put("/update", verifyRole("staff", "tutor", "older"), lessonsController.put_update_lessons);
lessons_routs.delete("/delete", verifyRole("staff", "tutor", "older"), lessonsController.delete_lessons);

export default lessons_routs;