import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserCardProps = {
  name: string;
  image: string;
};

export function UserCard({ name, image }: UserCardProps) {
  return (
    <Card className="mx-auto max-w-sm shadow-lg">
      <CardContent className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={image} alt="avatar" />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">{name}</CardTitle>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
