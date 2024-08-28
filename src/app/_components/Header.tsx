import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function Header() {
  const session = await getServerAuthSession();
  return (
    <header className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground shadow-sm">
      <div className="text-lg font-bold">Live Memory</div>
      <Button asChild variant="secondary">
        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? "ログアウト" : "ログイン"}
        </Link>
      </Button>
    </header>
  );
}
