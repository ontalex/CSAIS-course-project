import { db_pool } from "../../helpers/database.js";
import {everyFiled} from "../../helpers/validators.js";

class GroupsControllers {
    get_all_groups = (req, res) => {
        let sql = 'select * from `groups`;';

        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name   : err.name,
                    message: err.message
                })
            }

            res.json(result);
        }

        db_pool.query(sql, callback);
    }
    
    get_find_groups = (req, res) => {
        let sql = `select * from ` + "`groups`" + ` where name like "%${req.query.name}%"`;

        let values = [req.query.name];

        if (everyFiled(values, res)) {
            return res.status(400).json({
                name: "None felids",
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

        db_pool.query(sql, values, callback);
    }
    post_add_group = (req, res) => {
        let sql = "insert into `groups` (name, date_create, date_end, tutor_id) value (?, ?, ?, (select `teachers`.`id` from `teachers` where `teachers`.`fullname` = ? limit 1))";

        let values = [
            req.body.name,
            req.body.date_create,
            req.body.date_end,
            req.body.fullname
        ];

        if (everyFiled(values, res)) {
            return res.status(400).json({
                name: "None felids",
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

        db_pool.query(sql, values, callback);
    }
    put_update_groups = (req, res) => {
        let sql = 'update `groups` set name = ?, date_create = ?, date_end = ?, tutor_id = ? where id = ?;';

        let values = [
            req.body.name,
            req.body.date_create,
            req.body.date_end,
            req.body.tutor_id,
            req.query.id
        ];

        if (everyFiled(values, res)) {
            return res.status(400).json({
                name: "None felids",
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

        db_pool.query(sql, values, callback);
    }
    delete_group = (req, res) => {
        let sql = "delete from `groups` where id = ?;";

        let values = [req.query.id];

        if (everyFiled(values, res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }

        let callback = (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    name   : err.name,
                    message: err.message
                })
            }

            res.json(result);
        }

        db_pool.query(sql, values, callback);
    }
}

export default new GroupsControllers();