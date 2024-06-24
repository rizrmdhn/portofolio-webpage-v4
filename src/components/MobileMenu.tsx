"use client";

import { Home, Menu, Newspaper, Package2, Settings } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useAuthUser from "@/hooks/useAuthUser";
import { useTheme } from "next-themes";
import { useAction } from "next-safe-action/hooks";
import { logout } from "@/server/actions/auth-action";
import { useToast } from "./ui/use-toast";

export default function MobileMenu() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { execute, isExecuting } = useAction(logout, {
    onSuccess(args) {
      if (args.data?.status === "success") {
        toast({
          description: args.data?.message,
          title: "Success",
        });
      }
    },
    onError(args) {
      toast({
        description: args.error.serverError,
        title: "Error",
        variant: "destructive",
      });
    },
  });
  const { data, status: authUserStatus } = useAuthUser();

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
              <span className="sr-only">Singa</span>
            </Link>
            <Link
              href="/dashboard"
              className={isActiveMobile(location === "/dashboard")}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href={"/dashboard/articles"}
              className={isActiveMobile(location === "/dashboard/articles")}
            >
              <Newspaper className="h-5 w-5" />
              Articles
            </Link>
            <Link
              href={"/dashboard/settings"}
              className={isActiveMobile(
                location.includes("/dashboard/settings"),
              )}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          {authUserStatus === "pending" ? (
            <Skeleton className="h-10 w-10" />
          ) : (
            <Avatar className="h-10 w-10 border">
              <AvatarImage
                alt={data?.data?.data?.user.name}
                src={data?.data?.data?.user.name}
              />
              <AvatarFallback>
                {data?.data?.data?.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
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
          <DropdownMenuItem onClick={() => execute()} disabled={isExecuting}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
