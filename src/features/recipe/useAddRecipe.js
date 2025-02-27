import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe as createRecipeApi } from "../../services/apiRecipe";
import { toast } from "react-toastify";

export function useAddRecipe() {
  const queryClient = useQueryClient();
  const { mutate: addRecipe, isPending: isCreating } = useMutation({
    mutationFn: createRecipeApi,
    onSuccess: () => {
      toast.success("New recipe successfully created");

      queryClient.invalidateQueries({
        queryKey: ["recipes", "summery"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addRecipe, isCreating };
}
