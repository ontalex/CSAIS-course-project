import { db_pool } from "../../helpers/database.js";
import validators from "../../helpers/validators.js";

class OldersController {
    post_active_older = (req, res) => {
        // > req.body.student_id
        // < db < user (student) && !isactive
        let sql = "update `users` set `users`.`isactive` = 1 where `users`.`students_id` = ?;"
        let values = [req.body.student_id];
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
    post_off_older = (req, res) => {
        // > req.body.student_id
        // < db < user (student) && !isactive
        let sql = "update `users` set `users`.`isactive` = 0 where `users`.`students_id` = ?;"
        let values = [req.body.student_id];
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
    post_create_older = (req, res) => {
        // > req.body.student_id
        // ? Есть пользватель
    
        // генерация логина
        // генерация пароля
        // db < добавление пользователя
        // db < ? == 1 -> получить почту студента
        // db < ? == 1 -> отправить логин и пароль по почте
        // db < ? == 0 -> вернуть ошибку
    }
}

export default new OldersController();