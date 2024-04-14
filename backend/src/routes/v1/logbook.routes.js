import { Router } from 'express';
import { verifyRole } from "../../helpers/middleware/role.middleware.js";
import logbookController from '../../controllers/v1/logbook.controller.js';

const logbook_routs = Router();

logbook_routs.get("/day", verifyRole("staff", "tutor", "older"), logbookController.get_lesson_logbook);
// logbook_routs.get("/find",verifyRole("staff", "tutor", "older"), () => {});
logbook_routs.post("/add", verifyRole("staff", "tutor", "older"), logbookController.post_add_logbook);
logbook_routs.put("/update", verifyRole("staff", "tutor", "older"), logbookController.put_update_logbook);
logbook_routs.delete("/delete", verifyRole("staff", "tutor", "older"), logbookController.delete_logbook);

// 
logbook_routs.post("/top", verifyRole("staff", "tutor"), logbookController.post_top_logbook);

export default logbook_routs;