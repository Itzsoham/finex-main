import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user,
    isAuthenticated: Boolean(user),
    // Single-admin for now: the one migrated account is the admin, so it sees
    // all data (incl. imported rows whose created_by are old Supabase ids).
    // When the Team feature is migrated, derive this from the user's role.
    isAdmin: true,
    userId: user?.id,
  };
}
