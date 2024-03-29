import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Отсутствует токен авторизации. Пользователь не авторизован.",
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: "Недействительный токен авторизации. Пользователь не авторизован.",
                });
            }

            console.log("JWT decode:", decoded);

            req.user = decoded;

            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Пользователь не авторизован.",
        });
    }

};