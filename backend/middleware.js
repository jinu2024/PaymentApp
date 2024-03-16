const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired" });
        } else if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = {
    authMiddleware
};
