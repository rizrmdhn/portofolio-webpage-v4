"use client";

import {
  AreaChart,
  Briefcase,
  FolderGit2,
  Home,
  Menu,
  Package2,
  Settings,
  UserRoundCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useToast } from "./ui/use-toast";
import { type User } from "lucia";
import { Suspense } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { api } from "@/trpc/react";

type MobileMenuProps = {
  user: User;
};

export default function MobileMenu({ user }: MobileMenuProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const logoutMutation = api.auth.logout.useMutation({
    onSuccess: () => {
      toast({
        description: "Logout successful",
        title: "Success",
      });

      router.push("/login");
    },
    onError: (error) => {
      toast({
        description: error.message,
        title: "Error",
        variant: "destructive",
      });
    },
  });

  const location = usePathname();

  function isActiveMobile(bool: boolean) {
    return bool
      ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
      : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground";
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Dashboard</span>
            </Link>
            <Link
              href="/dashboard"
              className={isActiveMobile(location === "/dashboard")}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href={"/dashboard/projects"}
              className={isActiveMobile(location === "/dashboard/projects")}
            >
              <FolderGit2 className="h-4 w-4" />
              Projects
            </Link>
            <Link
              href={"/dashboard/experiences"}
              className={isActiveMobile(location === "/dashboard/experiences")}
            >
              <Briefcase className="h-4 w-4" />
              Experiences
            </Link>
            <Link
              href={"/dashboard/statistics"}
              className={isActiveMobile(location === "/dashboard/statistics")}
            >
              <AreaChart className="h-4 w-4" />
              Statistics
            </Link>
            <Accordion type="multiple">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="flex items-center gap-3 rounded-lg py-2 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary hover:no-underline">
                  <p className="flex items-center gap-4 pl-0.5">
                    <Settings className="h-4 w-4" />
                    Settings
                  </p>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col items-start gap-2 rounded-lg px-3 py-1 text-muted-foreground transition-all hover:cursor-pointer hover:text-primary">
                  <Link
                    href={"/dashboard/settings/account-settings"}
                    className={isActiveMobile(
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
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          <Suspense fallback={<Skeleton className="h-10 w-10" />}>
            <Avatar className="h-10 w-10 border">
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Suspense>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            Change Theme
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
