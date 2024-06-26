import { getDetailProject } from "@/server/actions/project-action";
import { useQuery } from "@tanstack/react-query";

export default function useGetDetailProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getDetailProject({ id }),
    staleTime: 1,
  });
}
