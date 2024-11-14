import { useQuery } from "@tanstack/react-query";
import { getFilteredExpenses } from "../../services/apiExpense";

export function useExpenses(
  isAdmin,
  userId,
  selectedUser = "all",
  selectedMonth = "all"
) {
  const {
    isLoading,
    data: expenses,
    error,
  } = useQuery({
    queryKey: ["expenses", isAdmin, userId, selectedUser, selectedMonth], // Include selectedUser and selectedMonth in the query key
    queryFn: () =>
      getFilteredExpenses(isAdmin, userId, selectedUser, selectedMonth), // Pass filters to the query function
    enabled: isAdmin || !!userId,
  });

  return {
    isLoading,
    expenses,
    error,
  };
}
