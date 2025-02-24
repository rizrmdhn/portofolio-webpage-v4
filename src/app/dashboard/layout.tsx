import DashboardLayout from "@/layout/DashboardLayout";
import getCurrentSession from "@/server/auth/sessions";
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

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
