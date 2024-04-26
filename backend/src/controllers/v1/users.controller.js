import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import data_generation from "../../helpers/data_generation.js";
import validators from "../../helpers/validators.js";
import { db_pool } from "../../helpers/database.js";

class UsersControllers {
  get_all_users = (req, res) => {
    let sql = "select * from `users`;";
    let value = [];
    let callback = (err, result) => {
      if (err) {
        res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }
      res.json(result);
    };
    db_pool.query(sql, value, callback);
  };

  get_users_self = (req, res) => {
    let sql = "select `users`.`login` from `users` where `users`.`id` = ?;";
    let values = [req.user.user_id];
    if (validators.everyFiled(values)) {
      return res.status(400).json({
        name: "None felids",
        message: "Some felid not send",
      });
    }
    let callback = (err, result) => {
      if (err) {
        return res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }
      res.json(result);
    };
    db_pool.query(sql, values, callback);
  };

  put_update_self = (req, res) => {
    let sql = "update users set login = ?, password = ? where id = ?;";
    let values = [
      req.body.login,
      bcryptjs.hashSync(req.body.password, parseInt(process.env.SALT)),
      req.user.user_id,
    ];
    if (validators.everyFiled(["password", "login"], req.body)) {
      return res.status(400).json({
        name: "None felids",
        message: "Some felid not send",
      });
    }
    let callback = (err, result) => {
      if (err) {
        return res.json({
          name: err.name,
          message: err.message,
        });
      }
      return res.json(result);
    };
    db_pool.query(sql, values, callback);
  };

  put_update_user = (req, res) => {
    let sql = "update `users` set ";
    let value = [];
    let callback = (err, result) => {
      if (err) {
        res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }

      res.json(result);
    };
    db_pool.query(sql, value, callback);
  };

  delete_user = (req, res) => {
    let sql = "delete from `users` where id = ?";
    let value = [req.query.id];
    let callback = (err, result) => {
      if (err) {
        res.status(500).json({
          name: err.name,
          message: err.message,
        });
      }

      res.json(result);
    };
    db_pool.query(sql, value, callback);
  };
}

export default new UsersControllers();
