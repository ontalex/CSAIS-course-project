import { Router } from 'express';
import studentsControllers from "../../controllers/v1/students.controller.js";
import { verifyRole } from "../../helpers/middleware/role.middleware.js";
const students_routs = Router();

students_routs.get(
    "/all",
    verifyRole("staff", "tutor", "older"),
    studentsControllers.get_all_students
);

students_routs.get(
    "/one",
    verifyRole("staff", "tutor", "older"),
    studentsControllers.get_one_student
);

students_routs.get(
    "/find",
    verifyRole("staff", "tutor", "older"),
    studentsControllers.get_find_students
);

students_routs.post(
    "/add",
    verifyRole("staff"),
    studentsControllers.post_add_student
);

students_routs.put(
    "/update",
    verifyRole("staff", "tutor"),
    studentsControllers.put_update_student
);

students_routs.delete(
    "/delete",
    verifyRole("staff"),
    studentsControllers.delete_student
);
export default students_routs;