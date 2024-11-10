import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../../services/apiRecipe";

export function useRecipes() {
  const { isLoading, data: recipes } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  return {
    isLoading,
    recipes,
  };
}
