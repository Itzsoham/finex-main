import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditExpense } from "../../services/apiExpense";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useAddExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addExpense, isPending: isCreating } = useMutation({
    mutationFn: addEditExpense,
    onSuccess: () => {
      toast.success("New expense successfully created");
      navigate("/expense");

      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addExpense, isCreating };
}
