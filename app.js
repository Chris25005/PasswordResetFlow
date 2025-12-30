const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoutes");
const recipesRouter = require("./routes/recipesRoutes");

const app = express();

/* ======================================================
   ✅ CORS (EXPRESS 5 SAFE)
====================================================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://comfy-manatee-a5f0fa.netlify.app/"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* ======================================================
   ✅ BODY PARSERS
====================================================== */
app.use(express.json());
app.use(cookieParser());

/* ======================================================
   ✅ ROUTES
====================================================== */
app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);

/* ======================================================
   ✅ HEALTH CHECK
====================================================== */
app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
