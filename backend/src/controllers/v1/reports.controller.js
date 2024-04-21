import { db_pool } from "../../helpers/database.js";
import validators from "../../helpers/validators.js";
import data_generation from "../../helpers/data_generation.js";
import helpers from "../../helpers/helpers.js";

class ReportsControllers {

    get_percent_logs_by_week = (req, res) => {
        if (validators.everyFiled(["group_id", "day"], res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }

        let sql = "SELECT COUNT(*) as count_logs, students.id, students.fullname FROM logbook JOIN students on logbook.students_id = students.id JOIN schedule ON logbook.schedule_id = schedule.id WHERE ( schedule.date_lesson BETWEEN ? AND ? ) AND students.group_id = ? AND logbook.type_log = ? GROUP BY logbook.students_id ORDER BY count_logs;";

        let week = helpers.getMondayAndSunday(req.body.day);

    }

}

export default new ReportsControllers();