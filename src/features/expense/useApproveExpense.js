import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { approveExpense as approveExpenseApi } from "../../services/apiExpense";

export function useApproveExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isEditing, mutate: approveExpense } = useMutation({
    mutationKey: ["expenses"],
    mutationFn: approveExpenseApi,
    onSuccess: () => {
      toast.success("Expense successfully Approved");
      navigate("/expense");

      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, approveExpense };
}
