import { Router } from 'express';

import { verifyRole } from "../../helpers/middleware/role.middleware.js";
import olderController from '../../controllers/v1/older.controller.js';

const older_routs = Router();

older_routs.post(
    "/active",
    verifyRole("tutor"),
    olderController.post_active_older
);

older_routs.post(
    "/off",
    verifyRole("tutor"),
    olderController.post_off_older
);

older_routs.post(
    "/create",
    verifyRole("tutor"),
    olderController.post_create_older
);

export default older_routs;