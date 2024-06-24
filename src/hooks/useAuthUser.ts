import { getAuthenticatedUser } from "@/server/actions/auth-action";
import { useQuery } from "@tanstack/react-query";

export default function useAuthUser() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: () => getAuthenticatedUser(),
    // 2 hours
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
