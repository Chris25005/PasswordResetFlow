const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoutes");
const recipesRouter = require("./routes/recipesRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://spontaneous-cuchufli-8e6709.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);

module.exports = app;
