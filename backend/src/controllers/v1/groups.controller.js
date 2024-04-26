import bcryptjs from "bcryptjs";
import data_generation from "../../helpers/data_generation.js";

import { db_pool } from "../../helpers/database.js";
import helpers from "../../helpers/helpers.js";
import validators from "../../helpers/validators.js";

import dotenv from "dotenv";
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

    let values = [req.body.name, req.body.date_create, req.body.date_end, teacher.id];

    let callback = async (err, result) => {
      if (err) {
        res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }

      // генерация логина
      let loginPref = [new Date().getDay(), new Date().getUTCMonth(), new Date().getMilliseconds(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].map((item) => item.toString()).join("");
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

        helpers.send_mail({
          target: teacher.email,
          topic: "Вам предоставлен доступ...",
          html: `<p>Вам предоставлен доступ к системе ИСПУК (Информационная система посещаемости учащихся колледжа)</p><p>Логин: ${login}</p><p>Пароль: ${password}</p><p>(Письмо сформированно автоматически, ответ вы не получите)</p>`,
          res: res
        });

      };
      db_pool.query(sqlTutor, valueTutor, callbackTutor);
    };

    db_pool.query(sql, values, callback);
  };
  put_update_groups = (req, res) => {
    // let sql =
    //   "update `groups` set name = ?, date_create = ?, date_end = ?, tutor_id = (select id from teachers where fullname = ? limit 1) where id = ?;";

    // let values = [req.body.name, req.body.date_create, req.body.date_end, req.body.tutor_name, req.query.id];

    // if (validators.everyFiled(values, res)) {
    //   return res.status(400).json({
    //     name: "None felids",
    //     message: "Some felid not send",
    //   });
    // }



    // let callback = async (err, result) => {
    //   if (err) {
    //     res.status(500).json({
    //       name: err.name,
    //       message: err.message,
    //     });
    //   }

    //   if (result.affectedRows > 0) {
    //     let user = await helpers.get_data_updated_user(req.body.tutor_name);
    //     helpers.send_mail({
    //       target: user.email,
    //       topic: "Обновлён куратор группы",
    //       html: `<p>Здравствуйте, Вы назначены в качестве куратора для группы ${req.body.name}. Воспользуйтесь своим аккаунтом для просмотра информации.</p>`,
    //       res: res
    //     })
    //   } else {
    //     let data_teacher = helpers.getTeacher(req.body.tutor_name);
    //     helpers.send_mail({
    //       target: data_teacher.email,
    //       topic: "Вам предоставлен доступ...",
    //       html: `<p>Вам предоставлен доступ к системе ИСПУК (Информационная система посещаемости учащихся колледжа)</p><p>Логин: ${login}</p><p>Пароль: ${password}</p><p>(Письмо сформированно автоматически, ответ вы не получите)</p>`,
    //       res: res
    //     });
    //   }

    //   res.json(result);
    // };



    // Группа существует?
    // Есть пользователь с id преподавателя под таким ФИО?
    // (да)   - Обновить куратора для группы;
    //        - Отправить на почту преподавателя сообщение о назначении;
    // (нет)  - Создать пользователя;
    //        - Отправить сообщение о создании пользователя;
    //        - Обновить куратора для группы;
    //        - Отправить на почту преподавателя сообщение о назначении;

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
