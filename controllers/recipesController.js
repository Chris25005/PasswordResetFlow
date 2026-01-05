import Recipes from "../models/Recipes.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/email.js";

/* ======================================================
   CREATE RECIPE
====================================================== */
export const createRecipes = async (req, res) => {
  try {
    const newRecipe = new Recipes(req.body);
    const savedRecipe = await newRecipe.save();

    // optional email notification
    await sendEmail(
      process.env.GOOGLE_APP_EMAIL || "admin@recipesapp.com",
      `New recipe "${savedRecipe.title}" created`
    );

    res.status(201).json({
      message: "Recipe created successfully",
      recipe: savedRecipe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Creating recipe failed",
      error: error.message,
    });
  }
};

/* ======================================================
   GET ALL RECIPES
====================================================== */
export const getallrecipes = async (_req, res) => {
  try {
    const recipes = await Recipes.find().select("-__v");
    res.status(200).json({
      message: "Recipes fetched successfully",
      recipes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetching recipes failed",
      error: error.message,
    });
  }
};

/* ======================================================
   GET RECIPE BY ID
====================================================== */
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id).select("-__v");

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      message: "Recipe fetched successfully",
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetching recipe failed",
      error: error.message,
    });
  }
};

/* ======================================================
   UPDATE RECIPE
====================================================== */
export const updateRecipeById = async (req, res) => {
  try {
    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Updating recipe failed",
      error: error.message,
    });
  }
};

/* ======================================================
   DELETE RECIPE
====================================================== */
export const deleteRecipeById = async (req, res) => {
  try {
    const deletedRecipe = await Recipes.findByIdAndDelete(req.params.id).select(
      "-__v"
    );

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      message: "Recipe deleted successfully",
      recipe: deletedRecipe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Deleting recipe failed",
      error: error.message,
    });
  }
};
