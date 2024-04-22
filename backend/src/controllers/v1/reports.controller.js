import { db_pool } from "../../helpers/database.js";
import validators from "../../helpers/validators.js";
import data_generation from "../../helpers/data_generation.js";
import helpers from "../../helpers/helpers.js";

class ReportsControllers {

    get_percent_logs_by_week = async (req, res) => {
        if (validators.everyFiled(["group_id", "day"], res.query)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }
        let week = helpers.getMondayAndSunday(req.query.day);
        console.log("WEEK: ", week);

        let sqlCountLogs = 'select students.fullname, count(logbook.type_log) as count_logs from logbook RIGHT JOIN students on logbook.students_id = students.id JOIN `schedule` ON logbook.schedule_id = `schedule`.`id` WHERE students.group_id = ? AND `schedule`.`date_lesson` BETWEEN ? AND ? GROUP BY students.fullname ORDER BY students.fullname;';
        let sqlCountSchedule = 'select count(*) as count from `schedule` WHERE ( `schedule`.`date_lesson` BETWEEN ? AND ? ) and `schedule`.`group_id` = ?;';
        let valuesCountLogs = [req.query.group_id, week.monday, week.sunday]
        let valuesCountSchedule = [week.monday, week.sunday, req.query.group_id]
        try {

            let [dataLogs, fieldsLogs] = await db_pool.promise().query(sqlCountLogs, valuesCountLogs);
            let [dataSchedule, fieldsSchedule] = await db_pool.promise().query(sqlCountSchedule, valuesCountSchedule);

            if (dataLogs.length == 0) {
                return res.json({
                    percent: 100
                })
            }

            let studentsNotHave = dataLogs.map((item) => 1 - (item.count_logs / dataSchedule[0].count));
            let sumCount = studentsNotHave.reduce((sum, item) => sum + item, 0);
            let percent = (sumCount / studentsNotHave.length) * 100

            return res.json({
                percent: Math.floor(percent)
            })

        } catch (error) {

            res.status(500).json({
                err: error.name
            })

        }

    }

    get_report_max = async (req, res) => {
        if (validators.everyFiled(["group_id", "day_start", "day_end"], res.query)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }

        
    }   

}

export default new ReportsControllers();