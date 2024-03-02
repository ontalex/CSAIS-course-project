import pool from "../database/db.js";

import jwt from "jsonwebtoken";

function errorGet(req) {
        return {
                sended: req.body,
                isError: true,
                accept: false
        }
}

class AuthController {

        async auth(req, res) {

                if (!(req.body.login && req.body.password)) {

                        console.log("ERROR - EXPRESS");
                        return res.status(401).json({
                                ...errorGet(req)
                        });

                }

                let query = "select * from users where login = ? and password = ?;";
                let values = [req.body.login, req.body.password];
                let func = (error, result) => {

                        if (error) {
                                console.log("ERROR - BD", error);
                                return res.status(401).json(errorGet(req));
                        }

                        if (!Boolean(result.length)) {
                                console.log("RES DB (none)", result.length);
                                return res.status(401).json({
                                        ...errorGet(req),
                                        isError: false
                                });
                        }

                        console.log("RES DB", result.length);
                        return res.status(200).json({
                                ...errorGet(req),
                                isError: false,
                                accept: true,
                                token: jwt.sign(
                                        { data: { id: result[0].id } },
                                        process.env.SECRET_KEY,
                                        { expiresIn: "1h" }
                                )
                        });

                };

                pool.query(query, values, func);
        }

        async check(req, res) {

                if (!req.body.token) {

                        console.log("ERROR - EXPRESS");
                        return res.status(401).json({
                                ...errorGet(req)
                        });

                }

                jwt.verify(req.body.token, process.env.SECRET_KEY, (err, decoded) => {
                        if (err) {
                                console.log("JWR FAIL", err);
                                res.status(401).json({
                                        ...errorGet(req),
                                })
                        } else {
                                console.log("decoded", decoded);
                                res.status(200).json({
                                        ...errorGet(req),
                                        isError: false,
                                        accept: true
                                })
                        }
                })

        }

}

export default new AuthController();