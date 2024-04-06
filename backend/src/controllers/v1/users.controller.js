import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

import data_generation, { get_random_string } from "../../helpers/data_generation.js";
import { everyFiled } from "../../helpers/validators.js";
import { db_pool } from "../../helpers/database.js";

dotenv.config();

class UsersControllers {
    get_all_users = (req, res) => {
        let sql = 'select * from `users`;';
        let value = [];
        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }

            res.json(result);
        }
        db_pool.query(sql, value, callback);
    }

    get_users_self = (req, res) => {

        let sql = 'select * from `users` where `users`.`id` = ?;';
        let values = [
            req.user.user_id
        ];

        if (validators.everyFiled(values)) {
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

    post_add_user = (req, res) => {

        let sql, value;

        if (validators.everyFiled([
            req.body.type,
            req.body.login,
            req.body.rule_id
        ])) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }

        let pass = data_generation.get_random_string(5);

        if (["older"].includes(req.body.type)) {
            sql = 'insert into `users` (login, password, secret_key, students_id, roles_id) value (?, ?, ?, ?, ?);';
            value = [
                req.body.login,
                bcryptjs.hashSync(pass, parseInt(process.env.SALT)),
                data_generation.get_random_string(36),
                req.body.students_id,
                req.body.rule_id
            ]
        } else if (["tutor"].includes(req.body.type)) {
            sql = 'insert into `users` (login, password, secret_key, teachers_id, roles_id) value (?, ?, ?, ?, ?);'
            value = [
                req.body.login,
                bcryptjs.hashSync(pass, parseInt(process.env.SALT)),
                data_generation.get_random_string(36),
                req.body.teachers_id,
                req.body.rule_id
            ]
        } else {
            sql = 'insert into `users` (login, password, secret_key, roles_id) value (?, ?, ?, ?);'
            value = [
                req.body.login,
                bcryptjs.hashSync(pass, parseInt(process.env.SALT)),
                data_generation.get_random_string(36),
                req.body.rule_id
            ]
        }

        console.log(value);
        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }

            res.json({ ...result, pass });
        }
        db_pool.query(sql, value, callback);
    }

    put_update_user = (req, res) => {
        let sql = 'update `users` set ';
        let value = [];
        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }

            res.json(result);
        }
        db_pool.query(sql, value, callback);
    }

    delete_user = (req, res) => {
        let sql = 'delete from `users` where id = ?';
        let value = [req.query.id];
        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }

            res.json(result);
        }
        db_pool.query(sql, value, callback);
    }
}

export default new UsersControllers();