import { db_pool } from "../../helpers/database.js";
import helpers, { getMondayAndSunday } from "../../helpers/helpers.js";
import { everyFiled } from "../../helpers/validators.js"

let check_have_logbook = (values, res) => {
    let sql = 'select * from `logbook` join `schedule` on `logbook`.`lessons_id`= `schedule`.`id` where `schedule`.`date_lesson` = ? and `schedule`.`number_lesson` = ?;'
    let has = true;
    let resultLog = [];
    let callback = (err, result) => {

        if (err) {
            res.status(500).json({
                name: err.name,
                message: err.message
            })
        }

        if (result.length > 0) {
            has != false;
            resultLog = result;
        }
    }
    db_pool.query(sql, values, callback);
    return { has, result: resultLog };
}

class LogbookController {

    get_lesson_logbook = (req, res) => {

        let sql = 'select * from `logbook` join `schedule` on `logbook`.`schedule_id`= `schedule`.`id` where `schedule`.`date_lesson` = ? and `schedule`.`number_lesson` = ?;';

        // date format: YYYY-MM-DD
        let values = [req.body.date, req.body.number_lesson];
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

    post_add_logbook = (req, res) => {

        let sql = 'insert into `logbook` (type_log, date_update, schedule_id, student_id,) value (?, NOW(), ?, ?);';
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

        let hasLog = check_have_logbook(values, res);
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
        if (validators.everyFiled(values, res)) {
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

            let values = [
                week.monday,
                week.sunday,
                req.body.group_id,
                req.body.type_log
            ];

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

    // get_percent_logs_by_week = (req, res) => {
    //     if (validators.everyFiled(["group_id", "day"], res)) {
    //         return res.status(400).json({
    //             name: "None felids",
    //             message: "Some felid not send"
    //         })
    //     }

    //     let sql = "SELECT COUNT(*) as count_logs, students.id, students.fullname FROM logbook JOIN students on logbook.students_id = students.id JOIN schedule ON logbook.schedule_id = schedule.id WHERE ( schedule.date_lesson BETWEEN ? AND ? ) AND students.group_id = ? AND logbook.type_log = ? GROUP BY logbook.students_id ORDER BY count_logs;";

    //     let week = helpers.getMondayAndSunday(req.body.day);
    // }

}

export default new LogbookController();