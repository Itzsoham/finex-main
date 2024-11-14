import supabase from "./supabase";

export const getRecipes = async (isAdmin, userId) => {
  let query = supabase.from("Recipe").select("*");

  if (!isAdmin) {
    query = query.eq("created_by", userId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const createRecipe = async (recipe) => {
  const { data, error } = await supabase.from("Recipe").insert(recipe);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
