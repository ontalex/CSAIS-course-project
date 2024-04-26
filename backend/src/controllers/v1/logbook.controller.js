import { db_pool } from "../../helpers/database.js";
import helpers from "../../helpers/helpers.js";
import validators from "../../helpers/validators.js";

class LogbookController {

    get_lesson_logbook = (req, res) => {
        let sql = 'select students.id, students.fullname, logbooks.type_log, logbooks.date_update, logbooks.id as log_id from students LEFT OUTER JOIN ( SELECT * FROM logbook WHERE logbook.schedule_id = ?) as logbooks ON students.id = logbooks.students_id WHERE students.group_id = ? ORDER BY students.fullname;'

        let values = [req.query.schedule_id, req.query.group_id];
        if (validators.everyFiled(values, res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }
        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }

            res.json(result);
        }
        db_pool.query(sql, values, callback);
    }

    post_add_logbook = async (req, res) => {

        let sql = 'insert into `logbook` (type_log, date_update, schedule_id, students_id) value (?, NOW(), ?, ?);';
        let values = [
            req.body.type_log,
            req.body.schedule_id,
            req.body.student_id
        ];

        if (validators.everyFiled(values, res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }

        let hasLog = await helpers.check_have_logbook(values, res);
        if (hasLog.has) {
            return res.status(409).json({
                name: "Already Has",
                message: "Статус уже существует",
                data: hasLog.result
            })
        }

        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }

            res.json(result);
        }

        db_pool.query(sql, values, callback);
    }

    put_update_logbook = (req, res) => {
        let sql = 'update `logbook` set `logbook`.`date_update` = NOW(), `logbook`.`type_log` = ? where `logbook`.`id` = ?';
        let values = [
            req.body.type_log,
            req.query.id
        ];
        if (validators.everyFiled(values, res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }
        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }

            res.json(result);
        }
        db_pool.query(sql, values, callback);
    }

    delete_logbook = (req, res) => {
        let sql = 'delete from `logbook` where `logbook`.`id` = ?;';
        let values = [req.query.id];
        if (validators.everyFiled(["id"], req.query)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }
        let callback = (err, result) => {
            if (err) {
                return res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }

            res.json(result);
        }
        db_pool.query(sql, values, callback);
    }

    post_top_logbook = (req, res) => {
        try {
            if (validators.everyFiled(["group_id", "type_log", "day"], res)) {
                return res.status(400).json({
                    name: "None felids",
                    message: "Some felid not send"
                })
            }
            let sql = "SELECT COUNT(*) as count_logs, students.id, students.fullname FROM logbook JOIN students on logbook.students_id = students.id JOIN schedule ON logbook.schedule_id = schedule.id WHERE ( schedule.date_lesson BETWEEN ? AND ? ) AND students.group_id = ? AND logbook.type_log = ? GROUP BY logbook.students_id ORDER BY count_logs;";
            let week = helpers.getMondayAndSunday(req.body.day);
            let values = [week.monday, week.sunday, req.body.group_id, req.body.type_log];
            let callback = (err, result) => {
                if (err) {
                    return res.status(500).json({
                        name: err.name,
                        message: err.message
                    })
                }

                res.json(result);
            }
            db_pool.query(sql, values, callback);
        } catch (error) {
            return res.status(500).json({
                message: "Server error"
            });
        }
    }

    get_percent_logs_by_week = async (req, res) => {
        if (validators.everyFiled(["group_id", "day"], req.query)) {
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

}

export default new LogbookController();