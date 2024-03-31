import { Router } from 'express';
import { verifyRole } from "../../helpers/middleware/role.middleware.js";
import groupsControllers from "../../controllers/v1/groups.controller.js";
import authController from '../../controllers/v1/auth.controller.js';

const groups_routs = Router();

groups_routs.get(
    "/find",
    verifyRole("staff", "tutor", "older"),
    groupsControllers.get_find_groups
);

groups_routs.get(
    "/all",
    verifyRole("staff", "tutor", "older"),
    groupsControllers.get_all_groups
);

groups_routs.post(
    "/add",
    verifyRole("staff", "tutor", "older"),
    groupsControllers.post_add_group
);

groups_routs.put(
    "/update",
    verifyRole("staff", "tutor", "older"),
    groupsControllers.put_update_groups
);

groups_routs.delete(
    "/delete",
    verifyRole("staff", "tutor", "older"),
    groupsControllers.delete_group
);

groups_routs.get(
    "/accesses",
    verifyRole("staff", "tutor", "older"),
    authController.accessesGroups
);


export default groups_routs;