import { api, HydrateClient } from "@/trpc/server";
import UserCardList from "./_components/user/UserCardList";
import SafeSuspense from "./_components/SafeSuspense";

export default async function Home() {
  const users = await api.user.getUserList();

  return (
    <HydrateClient>
      <SafeSuspense>
        <h1 className="mb-6 text-2xl font-bold">Users</h1>
        <UserCardList users={users} />
      </SafeSuspense>
    </HydrateClient>
  );
}
