import { json } from "express";
import { db_pool } from "../../helpers/database.js";
import validators from "../../helpers/validators.js";
import nodemailer from "nodemailer";
import helpers from "../../helpers/helpers.js";
import dotenv from "dotenv";
import data_generation from "../../helpers/data_generation.js";
import bcryptjs from "bcryptjs"

dotenv.config();

class OldersController {
  post_active_older = (req, res) => {
    // > req.body.student_id
    // < db < user (student) && !isactive
    let sql =
      "update `users` set `users`.`isactive` = 1 where `users`.`students_id` = ?;";
    let values = [req.body.student_id];
    if (validators.everyFiled(values, res)) {
      return res.status(400).json({
        name: "None felids",
        message: "Some felid not send",
      });
    }
    let callback = (err, result) => {
      if (err) {
        res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }

      res.json(result);
    };
    db_pool.query(sql, values, callback);
  };
  post_off_older = (req, res) => {
    // > req.body.student_id
    // < db < user (student) && !isactive
    let sql =
      "update `users` set `users`.`isactive` = 0 where `users`.`students_id` = ?;";
    let values = [req.body.student_id];
    if (validators.everyFiled(values, res)) {
      return res.status(400).json({
        name: "None felids",
        message: "Some felid not send",
      });
    }
    let callback = (err, result) => {
      if (err) {
        res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }

      res.json(result);
    };
    db_pool.query(sql, values, callback);
  };
  post_create_older = async (req, res) => {
    if (validators.everyFiled(["student_id"], res.body)) {
      return res.status(400).json({
        name: "None felids",
        message: "Some felid not send",
      });
    }

    // ? Есть пользватель
    let answer = helpers.hasUser(req.body.student_id);

    if (answer.isHas) {
      return res.json({
        name: "has",
        message: "Пользвоатель уже создан",
      });
    }

    // генерация логина
    let loginPref = [
      new Date().getDay(),
      new Date().getUTCMonth(),
      new Date().getMilliseconds(),
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds(),
    ]
      .map((item) => item.toString())
      .join("");
    let login = "older" + loginPref;

    // генерация пароля
    let password = data_generation.get_random_string(10);

    let sql =
      "insert into `users` (login, password, secret_key, students_id, roles_id) value (?, ?, ?, ?, ?);";
    let value = [
      login,
      bcryptjs.hashSync(password, parseInt(process.env.SALT)),
      data_generation.get_random_string(36),
      answer.data.students_id,
      await helpers.getRoleID("older"),
    ];
    let callback = async (err, result) => {
      if (err) {
        res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }

      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      transporter.sendMail({
        from: 'CASIS <csaisforcollege@yandex.ru>',
        to: answer.data.email,
        subject: "Вам предоставлен доступ...",
        html: `<p>Вам предоставлен доступ к системе ИСПУК (Информационная система посещаемости учащихся колледжа)</p><p>Логин: ${login}</p><p>Пароль: ${password}</p><p>(Письмо сформированно автоматически, ответ вы не получите)</p>`
      }).then(() => {
        res.json({ message: "Пользователь создан. Данные отправлены студенту." });
      }).catch(() => {
        res.json({ message: "Произошла ошибка при отпраке сообщения студенту. Пользователь создан." })
      });


    };
    db_pool.query(sql, value, callback);
  };
}

export default new OldersController();