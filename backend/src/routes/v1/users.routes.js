import { Router } from "express";
import usersController from "../../controllers/v1/users.controller.js";
import { verifyRole } from "../../helpers/middleware/role.middleware.js";

const users_routs = Router();

// users_routs.get("/all", verifyRole("staff"), usersController.get_all_users);     // verifyRole("staff"),
users_routs.get(
  "/self",
  verifyRole("staff", "tutor", "older"),
  usersController.get_users_self
);
users_routs.post(
  "/self/update",
  verifyRole("staff", "tutor", "older"),
  usersController.put_update_self
);
// users_routs.post("/add", verifyRole("staff", "tutor"), usersController.post_add_user);    //
// users_routs.put("/update", verifyRole("staff", "tutor"), usersController.put_update_user);
// users_routs.delete("/delete", verifyRole("staff", "tutor"), usersController.delete_user);

export default users_routs;
