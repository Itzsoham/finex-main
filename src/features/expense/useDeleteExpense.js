import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteExpense as deleteExpenseApi } from "../../services/apiExpense";

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  const { mutate: deleteExpense, isPending: isLoading } = useMutation({
    mutationFn: (id) => deleteExpenseApi(id),
    onSuccess: () => {
      toast.success("Expense deleted successfully");

      queryClient.invalidateQueries("expenses");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    deleteExpense,
    isLoading,
  };
}
