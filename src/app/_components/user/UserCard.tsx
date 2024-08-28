import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserCardProps = {
  name: string;
  email: string;
  avatarUrl: string;
};

export function UserCard({ name, email }: UserCardProps) {
  return (
    <Card className="mx-auto max-w-sm shadow-lg">
      <CardContent className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">{name}</CardTitle>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
