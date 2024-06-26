import { getExperienceDetailAction } from "@/server/actions/experience-action";
import { useQuery } from "@tanstack/react-query";

export default function useGetDetailExperience(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getExperienceDetailAction({ id }),
    staleTime: 1,
  });
}
