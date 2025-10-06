const express = require('express');
const {
    createRecipes,
    getallrecipes,
    getRecipeById,
    updateRecipeById,
    deleteRecipeById
} = require('../controllers/recipesController');
const { isAuthenticated } = require('../middlewares/auth');

const recipesRouter = express.Router();

// Public Routes
recipesRouter.get('/', getallrecipes);     // anyone can view recipes
recipesRouter.get('/:id', getRecipeById);  // anyone can view a single recipe

// Protected Routes (need token)
recipesRouter.post('/', isAuthenticated, createRecipes);
recipesRouter.put('/:id', isAuthenticated, updateRecipeById);
recipesRouter.delete('/:id', isAuthenticated, deleteRecipeById);

module.exports = recipesRouter;
