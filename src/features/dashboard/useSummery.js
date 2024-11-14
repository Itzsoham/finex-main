import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";

const getSummery = async (isAdmin, userId) => {
  let query = supabase.from("monthlyexpensereport").select("*");

  if (!isAdmin) {
    // Filter by userId if not admin
    query = query.eq("created_by", userId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export function useSummery(isAdmin, userId) {
  const { isLoading, data } = useQuery({
    queryKey: ["summery", isAdmin, userId],
    queryFn: () => getSummery(isAdmin, userId),
    enabled: !!userId || isAdmin,
  });

  return {
    isLoading,
    data,
  };
}
