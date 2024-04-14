import { Router } from 'express';
import { verifyRole } from "../../helpers/middleware/role.middleware.js";
import scheduleController from '../../controllers/v1/schedule.controller.js';
const schedule_routs = Router();

schedule_routs.get("/all", verifyRole("staff", "tutor", "older"), scheduleController.get_date_schedule);
// schedule_routs.get("/find", verifyRole("staff", "tutor", "older"), () => {});
schedule_routs.get("/min", verifyRole("staff", "tutor", "older"), scheduleController.get_date_schedule_min);
schedule_routs.post("/add", verifyRole("staff", "tutor", "older"), scheduleController.post_add_schedule);
schedule_routs.put("/update", verifyRole("staff", "tutor", "older"), () => { });
schedule_routs.delete("/delete", verifyRole("staff", "tutor", "older"), scheduleController.delete_schedule);

export default schedule_routs;