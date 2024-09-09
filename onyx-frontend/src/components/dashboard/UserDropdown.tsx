import { FC, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { ChevronDown, LoaderCircle } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import UserProfileDialogContent from "@/components/dashboard/UserProfileDialogContent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { type User } from "@/lib/validation/user";

interface UserDropdownProps {
  user: User;
  logout: () => Promise<void>;
}

const UserDropdown: FC<UserDropdownProps> = ({ user, logout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      await navigate({ to: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="justify-between space-x-2 rounded-full border-none p-0 pr-1 duration-500"
            disabled={!user || isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <UserAvatar username={user.username} />
            )}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={10}
          align="end"
          className="max-w-[150px]"
        >
          <DropdownMenuLabel className="truncate text-center capitalize">
            {user.username}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
        <UserProfileDialogContent user={user} />
      </DropdownMenu>
    </Dialog>
  );
};

export default UserDropdown;
