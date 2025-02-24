import DashboardLayout from "@/layout/DashboardLayout";
import getCurrentSession from "@/server/auth/sessions";
import { api, HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getCurrentSession();
  if (!user) {
    redirect("/login");
  }

  if (user.email !== "rizrmdhn@admin.com") {
    redirect("/");
  }

  api.pageView.view.prefetch();

  return (
    <DashboardLayout user={user}>
      <HydrateClient>{children}</HydrateClient>
    </DashboardLayout>
  );
}
