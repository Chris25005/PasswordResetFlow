// import express module
const express = require('express');
const recipesRouter = require('./routes/recipesRoutes');
const authRouter = require('./routes/authRoutes');

// create an express application
const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/recipes', recipesRouter);

module.exports = app;