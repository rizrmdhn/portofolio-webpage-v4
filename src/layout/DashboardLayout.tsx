import DesktopMenu from "@/components/DesktopMenu";
import MobileMenu from "@/components/MobileMenu";
import { type User } from "lucia";

type DashboardLayoutProps = {
  children: React.ReactNode;
  user: User;
};

export default function DashboardLayout({
  children,
  user,
}: DashboardLayoutProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <DesktopMenu />
      </div>
      <div className="flex flex-col">
        <MobileMenu user={user} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
