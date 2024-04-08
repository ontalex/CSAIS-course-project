import { db_pool } from "../../helpers/database.js";
import validators from "../../helpers/validators.js";

class ScheduleController {
    get_date_schedule = (req, res) => {
        let sql = 'select `schedule`.`id`, `schedule`.`number_lesson`, `schedule`.`date_lesson`, `schedule`.`group_id`, `lessons`.`name`, `teac_1`.`fullname` as `teacher_first`, `teac_2`.`fullname` as `teacher_second`, `schedule`.`room_first`, `schedule`.`room_second` from `schedule` join `lessons` on `schedule`.`lessons_id` = `lessons`.`id` join `teachers` as `teac_1` on `schedule`.`teachers_id_first` = `teac_1`.`id` left JOIN `teachers` as `teac_2` on `schedule`.`teachers_id_second` = `teac_2`.`id` where `schedule`.`date_lesson` = ? and `schedule`.`group_id` = ?;';
        let values = [req.query.date_lesson, req.query.group_id];
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
        db_pool.query(sql, values, callback)
    }

    post_add_schedule = (req, res) => {
        let sql = "insert into `schedule` (group_id, date_lesson, room_first, number_lesson, lessons_id, teachers_id_first) value (?, ?, ?, ?, (select `lessons`.`id` from `lessons` where `lessons`.`name` like ? limit 1), (SELECT `teachers`.`id` FROM `teachers` WHERE `teachers`.`fullname` LIKE ? LIMIT 1))";
        let values = [
            req.body.group_id,
            req.query.date_lesson,
            req.body.room_first,
            req.body.number_lesson,
            req.body.lesson_name,
            req.body.teachers_fullname_first // замена на ФИО
        ];
        if (validators.everyFiled(values, res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }

        if (req.body.room_second && req.body.teachers_fullname_second) {
            sql = "insert into `schedule` (group_id, date_lesson, room_first, number_lesson, lessons_id, teachers_id_first, room_second, teachers_id_second ) value (?, ?, ?, ?, (select `lessons`.`id` from `lessons` where `lessons`.`name` like ? limit 1), (SELECT `teachers`.`id` FROM `teachers` WHERE `teachers`.`fullname` LIKE ? LIMIT 1), ?, (SELECT `teachers`.`id` FROM `teachers` WHERE `teachers`.`fullname` LIKE ? LIMIT 1))";
            values = [
                req.body.group_id,
                req.query.date_lesson,
                req.body.room_first,
                req.body.number_lesson,
                req.body.lesson_name,
                req.body.teachers_fullname_first,
                req.body.room_second,
                req.body.teachers_fullname_second
            ];
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
        db_pool.query(sql, values, callback)
    }

    put_update_schedule = (req, res) => {
        let sql = "update `schedule` set `date_lesson` = ?, `room_first` = ?, `number_lesson` = ?, `lessons_id` = (select `lessons`.`id` from `lessons` where `lessons`.`name` like ? limit 1), `teachers_id_first` = (SELECT `teachers`.`id` FROM `teachers` WHERE `teachers`.`fullname` LIKE ? LIMIT 1) where `schedule`.`id` = ?;";
        let values = [
            req.body.date_lesson,
            req.body.room_first,
            req.body.number_lesson,
            req.body.lesson_name,
            req.body.teachers_fullname_first,
            req.query.id
        ];
        if (validators.everyFiled(values, res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }

        if (req.body.room_second && req.body.teachers_id_second) {
            sql = "update `schedule` set `date_lesson` = ?, `room_first` = ?, `number_lesson` = ?, `lessons_id` = (select `lessons`.`id` from `lessons` where `lessons`.`name` like ? limit 1), `teachers_id_first` = (SELECT `teachers`.`id` FROM `teachers` WHERE `teachers`.`fullname` LIKE ? LIMIT 1), `room_second` = ?, `teachers_id_second` = (SELECT `teachers`.`id` FROM `teachers` WHERE `teachers`.`fullname` LIKE ? LIMIT 1) where `schedule`.`id` = ?;";
            values = [
                req.query.date_lesson,
                req.body.room_first,
                req.body.number_lesson,
                req.body.lesson_name,
                req.body.teachers_fullname_first,
                req.body.room_second,
                req.body.teachers_fullname_second,
                req.query.id
            ];
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
        db_pool.query(sql, values, callback)
    }

    delete_schedule = (req, res) => {
        let sql_schedule = "delete from `schedule` where `schedule`.`id` = ?;";
        let values_schedule = [req.query.id];
        if (validators.everyFiled(values_schedule, res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }
        let callback_schedule = (err) => {
            if (err) {
                return res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }

            return res.json({
                name: "Complete",
                message: "Schedule item deleted"
            })
        }
        db_pool.query(sql_schedule, values_schedule, callback_schedule); // Удаление пары из расписания
    }

}

export default new ScheduleController();