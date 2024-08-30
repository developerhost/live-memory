import * as React from "react";

import Container from "@/app/_components/Container";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import Image from "next/image";

interface UserPageProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await api.user.getUserById({ id: params.id });

  if (!user) {
    return notFound();
  }

  return (
    <Container>
      <Image
        src={user.image ?? ""}
        alt="User Image"
        width={200}
        height={200}
        className="mx-auto rounded-full"
      />
      <h2 className="text-center text-3xl font-bold">{user.name}</h2>
    </Container>
  );
}
