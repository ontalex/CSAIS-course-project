import { db_pool } from "./database.js";
import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

class Helpers {
  getMondayAndSunday(dateString) {
    console.log(dateString);

    const date = new Date(dateString);
    const day = date.getDay();

    const monday = new Date(date);
    monday.setDate(date.getDate() - day + (day === 0 ? -6 : 1)); // переходим к понедельнику

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); // переходим к воскресенью

    return {
      monday: monday.toISOString().split("T")[0],
      sunday: sunday.toISOString().split("T")[0],
    };
  }

  hasUser = async (id, res, type) => {
    let user = {
      isHas: false,
      data: {},
    };
    let sql, values;

    console.log("HELPER HASUSE DATA:", id)

    if (type == "older") {
      sql = "select * from `users` where `users`.`students_id` = ?;";
    } else if (type == "tutor") {
      sql = "select * from `users` where `users`.`teachers_id` = ?;";
    }
    values = [id];

    console.log("HELPER HASUSE sql:", sql, values)

    try {
      let [data] = await db_pool.promise().query(sql, values);
      if (data.length > 0) {
        user.isHas = true;
        user.data = data[0];
      }
      console.log("Found user", data)
      return user;
    } catch (err) {
      return res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  };

  getRoleID = async (role) => {
    let sql = "select `roles`.`id` from `roles` where `roles`.`name` = ?;";
    let values = [role];
    try {
      let [data] = await db_pool.promise().query(sql, values);
      return data[0].id;
    } catch (err) {
      throw new Error({
        name: err.name,
        message: err.message,
      });
    }
  };

  getStudent = async (id_student, res) => {
    let sql = "select * from `students` where `students`.`id` = ?;";
    let values = [id_student];
    console.log("DB: ", id_student);
    try {
      let [data] = await db_pool.promise().query(sql, values);
      return data[0];
    } catch (err) {
      return res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  };

  getTeacher = async (fullname, res) => {
    let sql =
      "select * from `teachers` where `teachers`.`fullname` = ? limit 1";
    let values = [fullname];
    try {
      let [data] = await db_pool.promise().query(sql, values);
      return data[0];
    } catch (err) {
      return res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  };

  check_have_logbook = async (values, res) => {
    let sql =
      'select * from `logbook` join `schedule` on `logbook`.`schedule_id`= `schedule`.`id` where `schedule`.`date_lesson` = "2024-04-18" and `schedule`.`number_lesson` = 1 and `logbook`.`students_id` = ?;';
    try {
      let [data, fields, ...other] = await db_pool.promise().query(sql, values);
      let has, resultLog;

      console.log([data, fields, other]);

      if (data.length == 0) {
        has = false;
      } else {
        has = true;
        resultLog = data[0];
      }

      return { has: has, result: resultLog };
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  };

  send_mail = async ({ target, topic, html, res }) => {
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
      to: target,
      subject: topic,
      html: html
    }).then(() => {
      return res.json({ type: "Error", message: "Данные отправлены." });
    }).catch((err) => {
      console.log(err)
      return res.json({ type: "Error", message: "Произошла ошибка при отправке сообщения." })
    });
  };

  get_data_updated_user = async ({ fullname }) => {
    let sql = "select `users`.`email`, `users`.`fullname` from `users` where `users`.`teachers_id` = (select id from teachers where fullname = ? limit 1)";
    let values = [fullname];

    try {
      let [data] = await db_pool.promise().query(sql, values);
      return data
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
}

export default new Helpers();
