import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditType as addTypeApi } from "../../services/apiType";
import { toast } from "react-toastify";

export function useAddType() {
  const queryClient = useQueryClient();
  const { mutate: addType, isPending: isCreating } = useMutation({
    mutationFn: addTypeApi,
    onSuccess: () => {
      toast.success("New cabin successfully created");

      queryClient.invalidateQueries({
        queryKey: ["types"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addType, isCreating };
}
