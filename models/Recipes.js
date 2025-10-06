const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Recipe description is required"],
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
    },
    instructions: {
      type: String,
      required: [true, "Instructions are required"],
    },
    cookingTime: {
      type: Number,
      required: [true, "Cooking time is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
