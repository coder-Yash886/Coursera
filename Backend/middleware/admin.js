const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminmiddleware(req, res, next) {
    const token = req.headers.token;

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({
            message: "You are not signed in"
        });
    }
}

module.exports = {
    adminmiddleware
};
