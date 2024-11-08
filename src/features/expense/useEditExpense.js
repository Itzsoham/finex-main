import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addEditExpense } from "../../services/apiExpense";
import { useNavigate } from "react-router-dom";

export function useEditExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isEditing, mutate: editExpense } = useMutation({
    mutationKey: ["expenses"],
    mutationFn: ({ expense, id }) => addEditExpense(expense, id),
    onSuccess: () => {
      toast.success("Type successfully edited");
      navigate("/expense");

      queryClient.invalidateQueries({
        queryKey: ["types"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, editExpense };
}
