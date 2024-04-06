import jwt from "jsonwebtoken";

class Data_generations {
    get_random_string = (len) => {
        let abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+*/|,.?{}[]:;";
        let rs = "";
        while (rs.length < len) {
            rs += abc[Math.floor(Math.random() * abc.length)];
        }
        return rs;
    }

    generate_access_token = (user_id, role) => {
        let payload = { user_id, role };
        return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "3h" });
    }
}

export default new Data_generations();