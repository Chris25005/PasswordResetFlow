const express = require('express');
const {
    createRecipes,
    getallrecipes,
    getRecipeById,
    updateRecipeById,
    deleteRecipeById
} = require('../controllers/recipesController');
const { isAuthenticated, allowUsers} = require('../middlewares/auth');

const recipesRouter = express.Router();

// public routes: anyone can access (no authentication required)
recipesRouter.get('/', getallrecipes);  
recipesRouter.get('/:id', getRecipeById);  

// protected routes: only authenticated users can access
recipesRouter.post('/', isAuthenticated, allowUsers(['users', 'admin']), createRecipes);
recipesRouter.put('/:id', isAuthenticated, updateRecipeById);

// admin only route: only admin users can access
recipesRouter.delete('/:id', isAuthenticated, allowUsers(['admin']), deleteRecipeById);

module.exports = recipesRouter;
