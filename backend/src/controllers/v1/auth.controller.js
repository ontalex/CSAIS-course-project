import { db_pool } from "../../helpers/database.js";
import { generate_access_token } from "../../helpers/data_generation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {

    auth_login = async (req, res) => {

        async function find_user(login) {
            return new Promise((resolve, reject) => {
                let find_user_sql = "SELECT `users`.`id`, `users`.`login`, `users`.`password`, `users`.`isactive`, `roles`.`name` as `role` FROM `users` JOIN `roles` on `users`.`roles_id` = `roles`.`id` WHERE login = ?;";
                let find_user_felids = [login];

                db_pool.query(find_user_sql, find_user_felids, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result[0]);
                    }
                });
            });
        }

        let request_data = req.body;

        let user = await find_user(request_data.login);

        if (!user || user.isactive === 0) {
            return res.status(401).json({ message: `Пользователь '${request_data.login}' не найден` });
        }

        let valid_password = bcrypt.compareSync(request_data.password, user.password);
        if (!valid_password) {
            return res.status(401).json({ message: "Неверный пароль" });
        }

        let token = generate_access_token(user.id, user.role);

        console.log(user.role);

        return res.json({ token, role: user.role });
    }

    auth_token = (req, res) => {
        try {

            if (!req.headers.authorization) {
                return res.status(401).json({
                    accept: false,
                    message: "Отсутствует токен авторизации. Пользователь не авторизован.",
                });
            }

            const token = req.headers.authorization.split(" ")[1];

            jwt.verify(token, process.env.SECRET_KEY, (err) => {
                if (err) {
                    res.status(401).json({
                        accept: false,
                        message: "Недействительный токен авторизации. Пользователь не авторизован.",
                    });
                }

                res.json({
                    accept: true,
                    message: "Токен действителен",
                    role: jwt.decode(token, process.env.SECRET_KEY).role,
                    token: token
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                accept: false,
                message: "Пользователь не авторизован.",
            });
        }
    }

    accessesGroups = (req, res) => {
        try {
            let decoded = req.user; // type role, user id



            let sql = 'select * from users'
        } catch {

        }
    }

}

export default new AuthController();