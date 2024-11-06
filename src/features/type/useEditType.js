import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditType } from "../../services/apiType";
import { toast } from "react-toastify";

export function useEditType() {
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: editType } = useMutation({
    mutationKey: ["types"],
    mutationFn: ({ type, id }) => addEditType(type, id),
    onSuccess: () => {
      toast.success("Type successfully edited");

      queryClient.invalidateQueries({
        queryKey: ["types"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isLoading, editType };
}
