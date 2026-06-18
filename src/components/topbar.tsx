import { Bell, Moon, Sun, Search, LogOut, User, Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";
import { useAuth } from "./auth-provider";
import { logoutUser } from "@/lib/api/auth.functions";
import { useNavigate, Link } from "@tanstack/react-router";
import { ROLE_LABELS } from "@/lib/auth/rbac";
import { Badge } from "@/components/ui/badge";

export function Topbar() {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logoutUser();
      navigate({ to: "/auth/login" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-3 backdrop-blur sm:px-5">
      <SidebarTrigger />
      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search employees, companies…"
          className="pl-9 h-9 bg-muted/40 border-transparent"
          disabled
        />
      </div>
      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
              <Avatar className="h-8 w-8">
                {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.fullName} />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.fullName}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                <div className="mt-1.5">
                  <Badge variant="secondary" className="text-[10px] py-0 px-1.5 font-semibold">
                    {ROLE_LABELS[user.role]}
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.role === "employee" && (
              <DropdownMenuItem asChild>
                <Link to="/app/profile" className="w-full flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
            )}
            {user.role === "super_admin" && (
              <DropdownMenuItem asChild>
                <Link to="/app/settings" className="w-full flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
