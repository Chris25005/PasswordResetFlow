const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoutes");
const recipesRouter = require("./routes/recipesRoutes");

const app = express();

// ✅ CORS (NO WILDCARD ROUTES)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://exquisite-souffle-2b9096.netlify.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ BODY PARSERS
app.use(express.json());
app.use(cookieParser());

// ✅ ROUTES
app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);

module.exports = app;
