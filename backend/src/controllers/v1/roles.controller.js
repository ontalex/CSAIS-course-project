import { db_pool } from "../../helpers/database.js";
import { everyFiled } from "../../helpers/validators.js";

class RolesController {
    get_all_roles = (req, res) => {
        let sql = "select * from `roles`;";
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

    post_add_role = (req, res) => {
        let sql = "insert into `roles` (name) value (?)";
        let values = [req.body.name];
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

    put_update_role = (req, res) => {
        let sql = "update `roles` set name = ? where id = ?;";
        let values = [req.body.name, req.query.id];
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

    delete_role = (req, res) => {
        let sql = "delete from `roles` where id = ?;";
        let values = [req.query.id];
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
}

export default new RolesController();