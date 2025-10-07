// import express module
const express = require('express');
const recipesRouter = require('./routes/recipesRoutes');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

// create an express application
const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

// middleware to parse cookies
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/recipes', recipesRouter);

module.exports = app;