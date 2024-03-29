import { db_pool } from "../../helpers/database.js";
import { everyFiled } from "../../helpers/validators.js";

class ScheduleController {
    get_date_schedule = (req, res) => {
        let sql    = 'select * from `schedule` where `schedule`.`date_lesson` = ?';
        let values = [req.query.date_lesson];
        if (everyFiled(values, res)) {
            return res.status(400).json({
                name   : "None felids",
                message: "Some felid not send"
            })
        }
        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name   : err.name,
                    message: err.message
                })
            }

            res.json(result);
        }
        db_pool.query(sql, values, callback)
    }

    post_add_schedule = (req, res) => {
        let sql    = "insert into `schedule` (date_lesson, room_first, number_lesson, lessons_id, teachers_id_first) value (?, ?, ?, ?, ?)";
        let values = [
            req.query.date_lesson, 
            req.body.room_first, 
            req.body.number_lesson, 
            req.body.lessons_id, 
            req.body.teachers_id_first
        ];
        if (everyFiled(values, res)) {
            return res.status(400).json({
                name   : "None felids",
                message: "Some felid not send"
            })
        }

        if (req.body.room_second && req.body.teachers_id_second) {
            sql    = "insert into `schedule` (date_lesson, room_first, number_lesson, lessons_id, teachers_id_first, room_second, teachers_id_second ) value (?, ?, ?, ?, ?, ?, ?)";
            values = [req.query.date_lesson, req.body.room_first, req.body.number_lesson, req.body.lessons_id, req.body.teachers_id_first, req.body.room_second, req.body.teachers_id_second];
        }

        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name   : err.name,
                    message: err.message
                })
            }

            res.json(result);
        }
        db_pool.query(sql, values, callback)
    }

    put_update_schedule = (req, res) => {
        let sql    = "update `schedule` set `date_lesson` = ?, `room_first` = ?, `number_lesson` = ?, `lessons_id` = ?, `teachers_id_first` = ? where `schedule`.`id` = ?;";
        let values = [
            req.body.date_lesson,
            req.body.room_first,
            req.body.number_lesson,
            req.body.lessons_id,
            req.body.teachers_id_first,
            req.query.id
        ];
        if (everyFiled(values, res)) {
            return res.status(400).json({
                name   : "None felids",
                message: "Some felid not send"
            })
        }

        if (req.body.room_second && req.body.teachers_id_second) {
            sql    = "update `schedule` set `date_lesson` = ?, `room_first` = ?, `number_lesson` = ?, `lessons_id` = ?, `teachers_id_first` = ?, `room_second` = ?, `teachers_id_second` = ? where `schedule`.`id` = ?;";
            values = [
                req.query.date_lesson,
                req.body.room_first,
                req.body.number_lesson,
                req.body.lessons_id,
                req.body.teachers_id_first,
                req.body.room_second,
                req.body.teachers_id_second,
                req.query.id
            ];
        }

        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name   : err.name,
                    message: err.message
                })
            }

            res.json(result);
        }
        db_pool.query(sql, values, callback)
    }

    delete_schedule = (req, res) => {
        let sql_schedule = "delate from `schedule` where `schedule`.`id` = ?;";
        let values_schedule = [req.query.id];
        if (everyFiled(values_schedule, res)) {
            return res.status(400).json({
                name   : "None felids",
                message: "Some felid not send"
            })
        }
        let callback_schedule = (err) => {
            if (err) {
                res.status(500).json({
                    name   : err.name,
                    message: err.message
                })
            }
        }
        db_pool.query(sql_schedule, values_schedule, callback_schedule); // Удаление пары из расписания
    }

}

export default new ScheduleController();