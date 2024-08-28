import { api, HydrateClient } from "@/trpc/server";
import UserCardList from "./_components/user/UserCardList";

export default async function Home() {
  const users = await api.user.getUserList();

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
