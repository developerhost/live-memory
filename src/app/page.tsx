import { api, HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import UserCardList from "./_components/user/UserCardList";
import { Suspense } from "react";
import Container from "./_components/Container";

export default async function Home() {
  const users = await api.user.getUserList();

  return (
    <HydrateClient>
      <Container>
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
      </Container>
    </HydrateClient>
  );
}
