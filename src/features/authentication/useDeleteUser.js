import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending: isLoading } = useMutation({
    mutationFn: (userId) => deleteUserApi(userId),
    onSuccess: () => {
      toast.success("User deleted successfully");

      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    deleteUser,
    isLoading,
  };
}
