import { db_pool } from "../../helpers/database.js";
import { emailCheck, everyFiled, phoneCheck } from "../../helpers/validators.js";

class StudentControllers {
    get_all_students = (req, res) => {

        let sql = `select students.id, students.fullname, students.phone, students.email, students.group_id, users.isactive from students left join users on students.id = users.students_id where students.group_id = ?;`;
        let value = [Number(req.query.group_id)];

        if (everyFiled(["group_id"], req.query)) {
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

    get_one_student = (req, res) => {
        let sql = `select * from students where id = ?;`;
        let value = [req.query.id];

        if (everyFiled(value, res)) {
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

    get_find_students = (req, res) => {
        let sql = `select * from students where group_id = ? and fullname like '%${req.query.fullname}%';`;
        console.log("SQL", sql);
        let value = [
            req.query.group_id
        ];

        if (everyFiled([req.query.fullname, ...value], res)) {
            console.log(Error);
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }

        let callback = (err, result) => {
            console.log("CB DB");
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

    post_add_student = (req, res) => {

        let sql = `insert into students (fullname, phone, email, group_id) value (?, ?, ?, ?);`;
        let value = [
            req.body.fullname,
            req.body.phone,
            req.body.email,
            req.body.group_id,
        ];

        if (everyFiled(value, res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }

        console.log(value);

        if (emailCheck(req.body.email) || phoneCheck(req.body.phone)) {
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
    put_update_student = (req, res) => {

        let sql = `update students set fullname = ?, phone = ?, email = ?, group_id = ? where id = ?;`;
        let value = [
            req.body.fullname,
            req.body.phone,
            req.body.email,
            req.body.group_id,
            req.query.id
        ];

        if (everyFiled(value, res)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }

        if (emailCheck(req.body.email) || phoneCheck(req.body.phone)) {
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

    delete_student = (req, res) => {
        let sql = `delete from students where id = ?;`;

        let value = [req.query.id];

        if (everyFiled(value, res)) {
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

export default new StudentControllers();
