import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;
    console.log(token);

    if (!token) {
        return res.status(404).json({
            success: false,
            message: "LogIn First"
        })
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decodedData._id); 
    next();
}