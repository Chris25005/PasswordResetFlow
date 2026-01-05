import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ======================================================
   AUTHENTICATION MIDDLEWARE
====================================================== */
export const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ======================================================
   AUTHORIZATION MIDDLEWARE
====================================================== */
export const allowUsers = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Authorization failed" });
    }
  };
};
