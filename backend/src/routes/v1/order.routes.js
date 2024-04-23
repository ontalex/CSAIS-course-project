import { Router } from 'express';
import { verifyRole } from "../../helpers/middleware/role.middleware.js";
import reportsController from '../../controllers/v1/reports.controller.js';

const order_routs = Router();

order_routs.get("/logs", verifyRole("staff", "tutor", "older"), () => { });
order_routs.get("/get", verifyRole("staff", "tutor", "older"), reportsController.get_report_max);

export default order_routs;