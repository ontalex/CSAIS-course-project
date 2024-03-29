import jwt from "jsonwebtoken";

export const get_random_string = (len) => {
    let abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+*/|,.?{}[]:;";
    let rs = "";
    while( rs.length < len) {
        rs += abc[Math.floor(Math.random() * abc.length)];
    }
    return rs;
}

export const generate_access_token = (user_id, role) => {
    let payload = {user_id, role};
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "3h"});
}