import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import data_generation from "../../helpers/data_generation.js";

import nodemailer from "nodemailer";

import { db_pool } from "../../helpers/database.js";
import helpers from "../../helpers/helpers.js";
import validators from "../../helpers/validators.js";

dotenv.config();

class GroupsControllers {
  get_all_groups = (req, res) => {
    let sql =
      "SELECT `groups`.`id` as `group_id`, `groups`.`name`, `groups`.`date_create`, `groups`.`date_end`, `teachers`.`id`, `teachers`.`fullname` FROM `groups` JOIN `teachers` ON `groups`.`tutor_id` = `teachers`.`id`";

    let callback = (err, result) => {
      if (err) {
        res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }

      res.json(result);
    };

    db_pool.query(sql, callback);
  };

  get_find_id_groups = (req, res) => {
    let sql =
      "SELECT `groups`.`id` as `group_id`, `groups`.`name`, `groups`.`date_create`, `groups`.`date_end`, `teachers`.`id`, `teachers`.`fullname` FROM `groups` JOIN `teachers` ON `groups`.`tutor_id` = `teachers`.`id` WHERE `groups`.`id` = ?;";
    let values = [req.query.id];
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

  get_find_groups = (req, res) => {
    let sql =
      `select * from ` + "`groups`" + ` where name like "%${req.query.name}%"`;

    let values = [req.query.name];

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
  post_add_group = async (req, res) => {
    if (
      validators.everyFiled(
        ["name", "date_create", "date_end", "fullname"],
        res.body
      )
    ) {
      return res.status(400).json({
        name: "None felids",
        message: "Some felid not send",
      });
    }

    let teacher = await helpers.getTeacher(req.body.fullname, res);

    let sql =
      "insert into `groups` (name, date_create, date_end, tutor_id) value (?, ?, ?, ?)";

    let values = [
      req.body.name,
      req.body.date_create,
      req.body.date_end,
      teacher.id,
    ];

    let callback = async (err, result) => {
      if (err) {
        res.status(500).json({
          name: err.name,
          message: err.message,
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
      let login = "tutor" + loginPref;

      // генерация пароля
      let password = data_generation.get_random_string(10);

      let sqlTutor =
        "insert into `users` (login, password, secret_key, teachers_id, roles_id) value (?, ?, ?, ?, ?);";
      let valueTutor = [
        login,
        bcryptjs.hashSync(password, parseInt(process.env.SALT)),
        data_generation.get_random_string(36),
        teacher.id,
        await helpers.getRoleID("tutor"),
      ];
      let callbackTutor = async (err, result) => {
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

        transporter
          .sendMail({
            from: "CASIS <csaisforcollege@yandex.ru>",
            to: teacher.email,
            subject: "Вам предоставлен доступ...",
            html: `<p>Вам предоставлен доступ к системе ИСПУК (Информационная система посещаемости учащихся колледжа)</p><p>Логин: ${login}</p><p>Пароль: ${password}</p><p>(Письмо сформированно автоматически, ответ вы не получите)</p>`,
          })
          .then(() => {
            res.json({
              message: "Пользователь создан. Данные отправлены преподователю.",
            });
          })
          .catch(() => {
            res.json({
              message:
                "Произошла ошибка при отпраке сообщения преподователю. Пользователь создан.",
            });
          });
      };
      db_pool.query(sqlTutor, valueTutor, callbackTutor);
    };

    db_pool.query(sql, values, callback);
  };
  put_update_groups = (req, res) => {
    let sql =
      "update `groups` set name = ?, date_create = ?, date_end = ?, tutor_id = (select id from teachers where fullname = ? limit 1) where id = ?;";

    let values = [
      req.body.name,
      req.body.date_create,
      req.body.date_end,
      req.body.tutor_name,
      req.query.id,
    ];

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
  delete_group = (req, res) => {
    let sql = "delete from `groups` where id = ?;";

    let values = [req.query.id];

    if (validators.everyFiled(values, res)) {
      return res.status(400).json({
        name: "None felids",
        message: "Some felid not send",
      });
    }

    let callback = (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }

      res.json(result);
    };

    db_pool.query(sql, values, callback);
  };
}

export default new GroupsControllers();
