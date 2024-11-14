import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../../services/apiRecipe";

export function useRecipes(isAdmin, userId) {
  const { isLoading, data: recipes } = useQuery({
    queryKey: ["recipes", isAdmin, userId],
    queryFn: () => getRecipes(isAdmin, userId),
    enabled: !!userId || isAdmin,
  });

  return {
    isLoading,
    recipes,
  };
}
