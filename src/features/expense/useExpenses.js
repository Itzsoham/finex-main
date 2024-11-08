import { useQuery } from "@tanstack/react-query";
import { getAllExpenses } from "../../services/apiExpense";

export function useExpenses() {
  const { isLoading, data: expenses } = useQuery({
    queryKey: ["expenses"],
    queryFn: getAllExpenses,
  });

  return {
    isLoading,
    expenses,
  };
}
