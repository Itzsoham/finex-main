import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";

const getSummery = async () => {
  let { data, error } = await supabase.from("monthlyexpensereport").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export function useSummery() {
  const { isLoading, data } = useQuery({
    queryKey: ["expenses"],
    queryFn: getSummery,
  });

  return {
    isLoading,
    data,
  };
}
