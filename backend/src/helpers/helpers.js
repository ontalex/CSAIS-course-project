import { db_pool } from "./database.js";

class Helpers {
  getMondayAndSunday(dateString) {
    const date = new Date(dateString);
    const day = date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - day + (day === 0 ? -6 : 1)); // переходим к понедельнику
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); // переходим к воскресенью
    return {
      monday: monday.toISOString().slice(0, 10),
      sunday: sunday.toISOString().slice(0, 10),
    };
  }

  hasUser = async (id, res, type) => {
    let user = {
      isHas: false,
      data: {},
    };
    let sql, values;

    if (type == "older") {
      sql = "select * from `users` where `users`.`students_id` = ?;";
    } else if (type == "tutor") {
      sql = "select * from `users` where `users`.`teachers_id` = ?;";
    }
    values = [id];

    try {
      let [data, fields] = await db_pool.promise().query(sql, values);
      if (data.length > 0) {
        user.isHas = true;
        user.data = data[0];
      }
      return user;
    } catch (err) {
      return res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  };

  getStudent = async (id_student, res) => {
    // let user = { data: {} };
    let sql = "select * from `students` where `students`.`id` = ?;";
    let values = [id_student];
    console.log("DB: ", id_student);
    try {
      let [data, fields] = await db_pool.promise().query(sql, values);
      return data[0];
    } catch (err) {
      return res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  };

}

export default new Helpers();
