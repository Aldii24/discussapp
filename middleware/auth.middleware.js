import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded?.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authorize;
