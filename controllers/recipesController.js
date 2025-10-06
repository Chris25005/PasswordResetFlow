const Recipes = require('../models/Recipes');

// ✅ Create Recipe
const createRecipes = async (req, res) => {
    try {
        const newRecipe = new Recipes(req.body);
        const savedRecipe = await newRecipe.save();
        res.status(201).json({ 
            message: 'Recipe created successfully', 
            recipe: savedRecipe 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Creating Recipe failed...', 
            error: error.message 
        });
    }
};

// ✅ Get All Recipes (hides __v field)
const getallrecipes = async (_req, res) => {
    try {
        const recipes = await Recipes.find().select('-__v');
        res.status(200).json({ 
            message: "Recipes fetched successfully",
            recipes 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Fetching recipes failed...', 
            error: error.message 
        });
    }
};

// ✅ Get Recipe By ID
const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id).select('-__v');
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json({ 
            message: "Recipe fetched successfully", 
            recipe 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Fetching recipe failed...', 
            error: error.message 
        });
    }
};

// ✅ Update Recipe By ID
const updateRecipeById = async (req, res) => {
    try {
        const updatedRecipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // return updated doc & validate
        ).select('-__v');

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({ 
            message: "Recipe updated successfully", 
            recipe: updatedRecipe 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Updating recipe failed...', 
            error: error.message 
        });
    }
};

// ✅ Delete Recipe By ID
const deleteRecipeById = async (req, res) => {
    try {
        const deletedRecipe = await Recipes.findByIdAndDelete(req.params.id).select('-__v');

        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({ 
            message: "Recipe deleted successfully", 
            recipe: deletedRecipe 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Deleting recipe failed...', 
            error: error.message 
        });
    }
};

module.exports = {
    createRecipes,
    getallrecipes,
    getRecipeById,
    updateRecipeById,
    deleteRecipeById
};
