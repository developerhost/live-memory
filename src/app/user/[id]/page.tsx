import * as React from "react";

import Container from "@/app/_components/Container";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <Avatar className="mx-auto h-52 w-52 cursor-pointer">
        <AvatarImage src={user.image ?? ""} alt="User Avatar" />
        <AvatarFallback className="text-8xl">
          {user.name?.charAt(0) ?? "U"}
        </AvatarFallback>
      </Avatar>
      <h2 className="text-center text-3xl font-bold">{user.name}</h2>
    </Container>
  );
}
