import supabase from "./supabase";

export const getRecipes = async () => {
  const { data, error } = await supabase.from("Recipe").select("*");
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
