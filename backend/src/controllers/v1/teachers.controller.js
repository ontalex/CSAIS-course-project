import { db_pool } from "../../helpers/database.js";
import validators from "../../helpers/validators.js";

class TeachersControllers {
    get_all_teachers = (req, res) => {
        let sql = "select * from `teachers`;";
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

    get_one_teachers = (req, res) => {
        let sql = `select * from teachers where id = ?;`;
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

    get_find_teachers = (req, res) => {
        let sql = `select * from teachers where id = ?;`;
        if (validators.everyFiled([req.query.id], res)) {
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
        db_pool.query(sql, [req.query.id], callback);
    };

    get_find_min_teachers = (req, res) => {
        let sql = `select fullname from teachers where fullname like '%${req.body.fullname}%';`;
        if (validators.everyFiled([req.body.fullname], res)) {
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
        db_pool.query(sql, callback);
    }

    post_add_teachers = (req, res) => {
        let sql = `insert into teachers (fullname, phone, email) value (?, ?, ?);`;
        let value = [req.body.fullname, req.body.phone, req.body.email];
        if (validators.everyFiled(value, res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }
        if (validators.emailCheck(req.body.email) || validators.phoneCheck(req.body.phone)) {
            return res.status(400).json({
                name: "Error format",
                message: "Some felid has no good format"
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
    put_update_teachers = (req, res) => {
        let sql = `update teachers set fullname = ?, phone = ?, email = ? where id = ?;`;
        let value = [req.body.fullname, req.body.phone, req.body.email, req.query.id];
        if (validators.everyFiled(value, res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }
        if (validators.emailCheck(req.body.email) || validators.phoneCheck(req.body.phone)) {
            return res.status(400).json({
                name: "Error format",
                message: "Some felid has no good format"
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

    delete_teachers = (req, res) => {
        let sql = `delete from teachers where id = ?;`;
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

export default new TeachersControllers();
