import { Router } from 'express';
import teachersController from '../../controllers/v1/teachers.controller.js';
import { verifyRole } from "../../helpers/middleware/role.middleware.js";
const teachers_routs = Router();

teachers_routs.get("/all", verifyRole("staff", "tutor", "older"), teachersController.get_all_teachers);
teachers_routs.get("/find", verifyRole("staff"), teachersController.get_find_teachers);
teachers_routs.post("/find/min", verifyRole("staff", "tutor", "older"), teachersController.get_find_min_teachers);
teachers_routs.post("/add", verifyRole("staff"), teachersController.post_add_teachers);
teachers_routs.put("/update", verifyRole("staff"), teachersController.put_update_teachers);
teachers_routs.delete("/delete", verifyRole("staff"), teachersController.delete_teachers);

export default teachers_routs;