import { api, HydrateClient } from "@/trpc/server";

interface AdminChatLayoutProps {
  children: React.ReactNode;
}

export default function AdminChatLayout({ children }: AdminChatLayoutProps) {
  void api.message.list.prefetch();

  return (
    <section>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Messages</h1>
      </div>
      <div className="flex flex-col flex-wrap gap-4 p-4 lg:gap-6 lg:p-6">
        <HydrateClient>{children}</HydrateClient>
      </div>
    </section>
  );
}
