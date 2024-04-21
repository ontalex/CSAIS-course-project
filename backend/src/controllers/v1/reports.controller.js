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

        let sql = `select students.fullname, count(logbook.type_log) as count_logs, ( select count(*) from schedule WHERE schedule.date_lesson BETWEEN ? AND ? ) as total_lessons from logbook RIGHT JOIN students on logbook.students_id = students.id WHERE students.group_id = ? AND logbook.type_log = "н" OR logbook.type_log = "ну" OR logbook.type_log = "нб" GROUP BY students.fullname ORDER BY students.fullname;`;
        let values = [week.monday, week.sunday, req.query.group_id]
        try {
            // Получаем стадента с числом не посещаений и общего количества пар
            let [data, fields] = await db_pool.promise().query(sql, values);
            console.log("Data", data);
            console.log("Values", values);

            let transformPercentPersonal = data.map(student => student.persent = (student.total_lessons - student.count_logs) / student.total_lessons)

            console.log("Transformed", transformPercentPersonal);

            let middlePercent = transformPercentPersonal.reduce((sum, item) => sum + item, 0) / transformPercentPersonal.length

            console.log("MIDDLE: ", Math.round(middlePercent * 100));
            res.json({
                percent: Math.round(middlePercent * 100)
            })
        } catch (error) {
            res.status(500).json({
                err: error.name
            })
        }

    }

}

export default new ReportsControllers();