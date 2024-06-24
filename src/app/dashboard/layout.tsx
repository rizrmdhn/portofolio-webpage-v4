import DashboardLayout from "@/layout/DashboardLayout";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  if (user.email !== "rizrmdhn@admin.com") {
    redirect("/");
  }

  return (
    <DashboardLayout>
      {children}
      {modal}
      <div id="modal-root" />
    </DashboardLayout>
  );
}
