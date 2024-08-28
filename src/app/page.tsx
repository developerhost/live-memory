// import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
// import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import UserCardList from "./_components/user/UserCardList";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatarUrl: "/avatars/john.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "/avatars/jane.jpg",
    },
  ];

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mx-auto p-4">
          <h1 className="mb-6 text-2xl font-bold">ユーザー一覧</h1>
          <UserCardList users={users} />
        </div>
      </main>
    </HydrateClient>
  );
}
