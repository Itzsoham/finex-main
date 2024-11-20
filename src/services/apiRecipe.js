import supabase from "./supabase";

export const getRecipes = async (isAdmin, userId) => {
  let query = supabase.from("Recipe").select("*");

  if (!isAdmin) {
    query = query.eq("created_by", userId);
  }

  const { data: recipes, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const { data: userData, error: userError } =
    await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

  if (userError) {
    console.error(userError);
    throw new Error("Failed to fetch users");
  }

  // Map user IDs to names
  const userMap = userData.users.reduce((acc, user) => {
    acc[user.id] = user.user_metadata.fullName || "Unknown";
    return acc;
  }, {});

  // Attach user names to expenses
  const recipesWithUserNames = recipes.map((recipe) => ({
    ...recipe,
    created_by_name: userMap[recipe.created_by] || "Unknown",
  }));

  return recipesWithUserNames;
};

export const createRecipe = async (recipe) => {
  const { data, error } = await supabase.from("Recipe").insert(recipe);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
