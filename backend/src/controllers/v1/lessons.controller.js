import { db_pool } from "../../helpers/database.js";
import validators from "../../helpers/validators.js";

class LessonsController {
    get_all_lessons = (req, res) => {
        let sql = `select * from lessons;`;
        let callback = (err, result) => {
            if (err) {
                res.status(500).json({
                    name: err.name,
                    message: err.message
                })
            }

            res.json(result);
        }
        db_pool.query(sql, callback);
    }

    get_find_lessons = (req, res) => {


        let sql = `select * from lessons where name like "%${req.query.name}%";`;

        let value = [req.query.name];

        if (validators.everyFiled(value, res)) {
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

        db_pool.query(sql, value, callback);
    }

    get_find_id_lessons = (req, res) => {
        let sql = 'select * from lessons where id = ?;'
        let value = [req.query.id];
        if (validators.everyFiled(value, res)) {
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
        db_pool.query(sql, value, callback);
    }

    post_add_lessons = (req, res) => {
        let sql = `insert into lessons (name) value (?);`;
        let value = [req.body.name];

        if (validators.everyFiled(value, res)) {
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

        db_pool.query(sql, value, callback);
    }

    put_update_lessons = (req, res) => {
        let sql = `update lessons set name = ? where id = ?`;

        let value = [
            req.body.name,
            req.query.id
        ];

        if (validators.everyFiled(value, res)) {
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

        db_pool.query(sql, value, callback);
    }

    delete_lessons = (req, res) => {
        let sql = `delete from lessons where id = ?;`;
        let value = [req.query.id];
        if (validators.everyFiled(value, res)) {
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
        db_pool.query(sql, value, callback);
    }
}

export default new LessonsController();