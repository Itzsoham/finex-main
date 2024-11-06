import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteType as deleteTypeApi } from "../../services/apiType";

export function useDeleteType() {
  const queryClient = useQueryClient();
  const { mutate: deleteType, isPending: isLoading } = useMutation({
    mutationFn: (id) => deleteTypeApi(id),
    onSuccess: () => {
      toast.success("Type deleted successfully");

      queryClient.invalidateQueries("types");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    deleteType,
    isLoading,
  };
}
