import jwt from "jsonwebtoken";

export const verifyRole = (...notes) => {

    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];

            if (!token) {
                return res.status(403).json({
                    message: "Отсутствует токен авторизации. Пользователь не авторизован.",
                });
            }

            let userSecret = jwt.verify(token, process.env.SECRET_KEY);
            console.log(userSecret);
            let hasRole = false;

            if (notes.includes(userSecret.role)) {
                hasRole = true;
            }

            if (!hasRole) {
                return res.status(403).json({ message: "Доступ запрещён" });
            }

            next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({
                message: "Пользователь не авторизован.",
            });
        }
    }

}