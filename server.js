import "dotenv/config";               // MUST be first
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import recipesRoutes from "./routes/recipesRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

/* ======================================================
   CONNECT DATABASE
====================================================== */
connectDB();

/* ======================================================
   MIDDLEWARES
====================================================== */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://passwordresetflow007.netlify.app/login",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/* ======================================================
   ROUTES
====================================================== */
app.use("/auth", authRoutes);
app.use("/recipes", recipesRoutes);

/* ======================================================
   HEALTH CHECK
====================================================== */
app.get("/", (req, res) => {
  res.status(200).send("✅ Recipes API is running");
});

/* ======================================================
   START SERVER
====================================================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
