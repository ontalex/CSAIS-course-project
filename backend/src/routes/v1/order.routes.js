import { Router } from 'express';
import { verifyRole } from "../../helpers/middleware/role.middleware.js";

const order_routs = Router();

order_routs.get("/logs",verifyRole("staff", "tutor", "older"), () => {});

export default order_routs;