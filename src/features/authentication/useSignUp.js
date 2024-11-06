import { toast } from "react-toastify";
import { signup as signupApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignup() {
  const queryClient = useQueryClient();
  const { isPending: isLoading, mutate: signup } = useMutation({
    mutationFn: ({ email, password, fullName, role, phone }) =>
      signupApi({ email, password, fullName, role, phone }),
    onSuccess: () => {
      toast.success("User successfully created");
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, signup };
}
