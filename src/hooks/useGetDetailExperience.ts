import { getExperienceDetailAction } from "@/server/actions/experience-action";
import { useQuery } from "@tanstack/react-query";

export default function useGetDetailExperience(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getExperienceDetailAction({ id }),
    // 2 hours
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
