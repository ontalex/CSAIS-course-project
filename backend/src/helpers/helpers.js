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

  hasUser = (id_student) => {
    let student = {
      isHas: false,
      data: {},
    };
    let sql = "select * from `users` where `users`.`students_id` = ?;";
    let values = [id_student];
    let callback = (err, result) => {
      if (err) {
        res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }

      if (result.length > 0) {
        student.isHas = true;
        student.data = result[0];
      }
    };

    db_pool.query(sql, values, callback);
    return student;
  };

  getRoleID = (role) => {
    let sql = "select `roles`.`id` from `roles` where `roles`.`name` = ?;";
    let values = [role];
    let roleID;

    let callback = (err, result) => {
      if (err) {
        throw Error("DB: ", err);
      }
      roleID = result[0];
    };

    db_pool.query(sql, values, callback);
    return roleID;
  };
}

export default new Helpers();
