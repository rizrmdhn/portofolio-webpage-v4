import { getDetailProject } from "@/server/actions/project-action";
import { useQuery } from "@tanstack/react-query";

export default function useGetDetailProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getDetailProject({ id }),
    // 2 hours
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
