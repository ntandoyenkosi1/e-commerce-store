const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    console.log(token);
    if (!token) return res.status(401).send({
        ok: false,
        error: "Access denied. No token provided"
    });
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send({
            ok: false,
            error: error
        });
    }
    next();
}
module.exports=auth