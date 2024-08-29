import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function Header() {
  const session = await getServerAuthSession();
  return (
    <header className="flex items-center justify-between border-b-2 bg-black px-4 py-3 text-primary-foreground shadow-sm">
      <Link href="/" className="text-lg font-bold">
        Live Memory
      </Link>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={session.user.image ?? ""} alt="User Avatar" />
              <AvatarFallback>
                {session.user.name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={`/user/${session.user.id}`}>プロフィール</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/api/auth/signout">ログアウト</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild variant="secondary">
          <Link href="/api/auth/signin">ログイン</Link>
        </Button>
      )}
    </header>
  );
}
