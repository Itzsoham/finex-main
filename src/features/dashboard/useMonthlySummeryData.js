import { useQuery } from "@tanstack/react-query";
import neon from "../../services/neon";

const getMonthlyExpenseReport = async (selectedUser, selectedMonth) => {
  let query = neon.from("monthlyexpensereport").select("*");

  if (selectedUser !== "all") {
    query = query.eq("created_by", selectedUser);
  }

  if (selectedMonth !== "all") {
    query = query.eq("month", selectedMonth);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export function useMonthlySummeryData(selectedUser, selectedMonth) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["summery", selectedUser, selectedMonth],
    queryFn: () => getMonthlyExpenseReport(selectedUser, selectedMonth),
    enabled: !!selectedUser || !!selectedMonth,
  });

  return {
    isLoading,
    data,
    error,
  };
}
