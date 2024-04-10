import { db_pool } from "../../helpers/database.js";
import data_generation from "../../helpers/data_generation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
    auth_login = async (req, res) => {
        async function find_user(login) {
            return new Promise((resolve, reject) => {
                let find_user_sql =
                    "SELECT `users`.`id`, `users`.`login`, `users`.`password`, `users`.`isactive`, `roles`.`name` as `role` FROM `users` JOIN `roles` on `users`.`roles_id` = `roles`.`id` WHERE login = ?;";
                let find_user_felids = [login];

                db_pool.query(
                    find_user_sql,
                    find_user_felids,
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result[0]);
                        }
                    }
                );
            });
        }

        let request_data = req.body;

        let user = await find_user(request_data.login);

        if (!user || user.isactive === 0) {
            return res
                .status(401)
                .json({
                    message: `Пользователь '${request_data.login}' не найден`,
                });
        }

        let valid_password = bcrypt.compareSync(
            request_data.password,
            user.password
        );
        if (!valid_password) {
            return res.status(401).json({ message: "Неверный пароль" });
        }

        let token = data_generation.generate_access_token(user.id, user.role);

        console.log(user.role);

        return res.json({ token, role: user.role });
    };

    auth_token = (req, res) => {
        try {
            if (!req.headers.authorization) {
                return res.status(401).json({
                    accept: false,
                    message:
                        "Отсутствует токен авторизации. Пользователь не авторизован.",
                });
            }

            const token = req.headers.authorization.split(" ")[1];

            jwt.verify(token, process.env.SECRET_KEY, (err) => {
                if (err) {
                    return res.status(401).json({
                        accept: false,
                        message:
                            "Недействительный токен авторизации. Пользователь не авторизован.",
                    });
                }

                let decoded = jwt.decode(token, process.env.SECRET_KEY);

                let sqlTutor =
                    "SELECT `groups`.`id`, `groups`.`name` FROM `users` JOIN `groups` ON `users`.`teachers_id` = `groups`.`tutor_id` WHERE `users`.`id` = ? LIMIT 1;"; // teachers
                let sqlOlder =
                    "SELECT `groups`.`id`, `groups`.`name` FROM `users` JOIN `students` ON `users`.`students_id` = `students`.`id` JOIN `groups` on `students`.`group_id` = `groups`.`id` WHERE `users`.`id` = ? LIMIT 1;"; // older
                let sqlStaff =
                    "SELECT `groups`.`id`, `groups`.`name` from `groups` LIMIT 1;"; // staff

                let currentSQL;

                if (decoded.role === "staff") {
                    currentSQL = sqlStaff;
                } else if (decoded.role === "tutor") {
                    currentSQL = sqlTutor;
                } else if (decoded.role === "older") {
                    currentSQL = sqlOlder;
                } else {
                    return res.status(500).json({
                        message:
                            "Ошибка базы данных. Отсутствует роль пользователя.",
                    });
                }

                db_pool.query(currentSQL, [decoded.user_id], (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: err.message,
                        });
                    }

                    console.log(result);

                    return res.json({
                        accept: true,
                        message: "Токен действителен",
                        role: decoded.role,
                        group: result,
                        token: token,
                    });
                });
            });
        } catch (error) {
            return res.status(401).json({
                accept: false,
                message: "Пользователь не авторизован.",
            });
        }
    };

    accesses_groups = (req, res) => {
        try {
            let decoded = req.user; // type role, user id

            let sqlTutor =
                "SELECT `groups`.`id`, `groups`.`name` FROM `users` JOIN `groups` ON `users`.`teachers_id` = `groups`.`tutor_id` WHERE `users`.`id` = ?;"; // teachers
            let sqlOlder =
                "SELECT `groups`.`id`, `groups`.`name` FROM `users` JOIN `students` ON `users`.`students_id` = `students`.`id` JOIN `groups` on `students`.`group_id` = `groups`.`id` WHERE `users`.`id` = ?;"; // older
            let sqlStaff =
                "SELECT `groups`.`id`, `groups`.`name` from `groups`;"; // staff

            let currentSQL;

            if (decoded.role === "staff") {
                currentSQL = sqlStaff;
            } else if (decoded.role === "tutor") {
                currentSQL = sqlTutor;
            } else if (decoded.role === "older") {
                currentSQL = sqlOlder;
            } else {
                return res.status(500).json({
                    message:
                        "Ошибка базы данных. Отсутствует роль пользователя.",
                });
            }

            db_pool.query(currentSQL, [decoded.user_id], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message,
                    });
                }

                return res.json(result);
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Ошибка базы данных",
            });
        }
    };
}

export default new AuthController();
