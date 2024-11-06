import { useQuery } from "@tanstack/react-query";
import { getAllTypes } from "../../services/apiType";

export function useTypes() {
  const { isLoading, data: types } = useQuery({
    queryKey: ["types"],
    queryFn: getAllTypes,
  });

  return {
    isLoading,
    types,
  };
}
