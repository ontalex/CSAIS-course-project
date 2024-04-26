import { json } from "express";
import { db_pool } from "../../helpers/database.js";
import validators from "../../helpers/validators.js";
import nodemailer from "nodemailer";
import helpers from "../../helpers/helpers.js";
import data_generation from "../../helpers/data_generation.js";
import bcryptjs from "bcryptjs";

import dotenv from "dotenv";
dotenv.config();

class OldersController {
  post_active_older = (req, res) => {
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
    let answer = await helpers.hasUser(req.body.student_id, res, "older");
    let student = await helpers.getStudent(req.body.student_id, res);
    if (answer.isHas) {
      return res.json({
        name: "has",
        message: "Пользвоатель уже создан",
      });
    }
    let loginPref = [new Date().getDay(), new Date().getUTCMonth(), new Date().getMilliseconds(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].map((item) => item.toString()).join("");
    let login = "older" + loginPref;
    let password = data_generation.get_random_string(10);
    let sql = "insert into `users` (login, password, secret_key, students_id, roles_id) value (?, ?, ?, ?, ?);";
    let value = [login, bcryptjs.hashSync(password, parseInt(process.env.SALT)), data_generation.get_random_string(36), req.body.student_id, await helpers.getRoleID("older")];
    let callback = async (err, result) => {
      if (err) {
        res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }
      await helpers.send_mail({
        target: student.email,
        subject: "Вам предоставлен доступ...",
        html: `<p>Вам предоставлен доступ к системе ИСПУК (Информационная система посещаемости учащихся колледжа)</p><p>Логин: ${login}</p><p>Пароль: ${password}</p><p>(Письмо сформированно автоматически, ответ вы не получите)</p>`,
        res: res
      })
    };
    db_pool.query(sql, value, callback);
  };
}

export default new OldersController();
