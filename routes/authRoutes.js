const express = require('express');
const { registerUser, loginUser, Me, logout } = require('../controllers/authController');
const authRouter = express.Router();
const { isAuthenticated } = require('../middlewares/auth');

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/me', isAuthenticated, Me);
authRouter.post('/logout', isAuthenticated, logout);

module.exports = authRouter;