import { api, HydrateClient } from "@/trpc/server";

interface V2LayoutProps {
  children: React.ReactNode;
}

export default function V2Layout({ children }: V2LayoutProps) {
  api.experience.list.prefetch();
  api.project.list.prefetch();

  return <HydrateClient>{children}</HydrateClient>;
}
