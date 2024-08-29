import { api, HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import UserCardList from "./_components/user/UserCardList";
import { Suspense } from "react";

export default async function Home() {
  const users = await api.user.getUserList();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-blue-950 text-white">
        <div className="container mx-auto p-4">
          <ErrorBoundary
            fallback={
              <div>エラーが発生しました。ページをリロードしてください。</div>
            }
          >
            <Suspense fallback={<div>Loading...</div>}>
              <h1 className="mb-6 text-2xl font-bold">Users</h1>
              <UserCardList users={users} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
    </HydrateClient>
  );
}
