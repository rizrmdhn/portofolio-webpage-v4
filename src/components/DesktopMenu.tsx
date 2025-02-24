"use client";

import {
  AreaChart,
  Briefcase,
  FolderGit2,
  Home,
  Package2,
  Settings,
  UserRoundCog,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopMenu() {
  const location = usePathname();

  function isActiveDesktop(bool: boolean) {
    return bool
      ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary hover:cursor-pointer"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:cursor-pointer";
  }

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">Dashboard</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            href="/dashboard"
            className={isActiveDesktop(location === "/dashboard")}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href={"/dashboard/projects"}
            className={isActiveDesktop(location === "/dashboard/projects")}
          >
            <FolderGit2 className="h-4 w-4" />
            Projects
          </Link>
          <Link
            href={"/dashboard/experiences"}
            className={isActiveDesktop(location === "/dashboard/experiences")}
          >
            <Briefcase className="h-4 w-4" />
            Experiences
          </Link>
          <Link
            href={"/dashboard/statistics"}
            className={isActiveDesktop(location === "/dashboard/statistics")}
          >
            <AreaChart className="h-4 w-4" />
            Statistics
          </Link>

          <Accordion type="multiple">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary hover:no-underline">
                <p className="flex items-center gap-3">
                  <Settings className="h-4 w-4" />
                  Settings
                </p>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col items-start gap-2 rounded-lg px-3 py-1 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary">
                <Link
                  href={"/dashboard/settings/account-settings"}
                  className={isActiveDesktop(
                    location.includes("/dashboard/settings/account-settings"),
                  )}
                >
                  <UserRoundCog className="h-4 w-4" />
                  Account Settings
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </div>
    </div>
  );
}
