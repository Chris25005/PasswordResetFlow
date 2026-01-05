import express from "express";
import {
  createRecipes,
  getallrecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById
} from "../controllers/recipesController.js";

import { isAuthenticated, allowUsers } from "../middlewares/auth.js";

const recipesRouter = express.Router();

/* Public routes */
recipesRouter.get("/", getallrecipes);
recipesRouter.get("/:id", getRecipeById);

/* Protected routes */
recipesRouter.post(
  "/",
  isAuthenticated,
  allowUsers(["user", "admin"]),
  createRecipes
);

recipesRouter.put(
  "/:id",
  isAuthenticated,
  updateRecipeById
);

/* Admin only */
recipesRouter.delete(
  "/:id",
  isAuthenticated,
  allowUsers(["admin"]),
  deleteRecipeById
);

export default recipesRouter;
