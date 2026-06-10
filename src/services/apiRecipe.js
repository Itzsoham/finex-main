import neon from "./neon";
import { getUsersMap } from "./apiAuth";

export const getRecipes = async (isAdmin, userId) => {
  let query = neon.from("Recipe").select("*");

  if (!isAdmin) {
    query = query.eq("created_by", userId);
  }

  const { data: recipes, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  // Map created_by -> user name via the Neon Auth synced users table.
  const userMap = await getUsersMap();

  const recipesWithUserNames = recipes.map((recipe) => ({
    ...recipe,
    created_by_name: userMap[recipe.created_by] || "Unknown",
  }));

  return recipesWithUserNames;
};

export const createRecipe = async (recipe) => {
  const { data, error } = await neon.from("Recipe").insert(recipe);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
