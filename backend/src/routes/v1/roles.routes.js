import { Router } from 'express';
import rolesController from '../../controllers/v1/roles.controller.js';
import { verifyRole } from "../../helpers/middleware/role.middleware.js";

const roles_routs = Router();

roles_routs.get(
    "/all",
    verifyRole("staff"),
    rolesController.get_all_roles
);

roles_routs.post(
    "/add", 
    verifyRole("staff"),
    rolesController.post_add_role
);

roles_routs.put(
    "/update", 
    verifyRole("staff"),
    rolesController.put_update_role
);

roles_routs.delete(
    "/delete", 
    verifyRole("staff"),
    rolesController.delete_role
);

export default roles_routs;