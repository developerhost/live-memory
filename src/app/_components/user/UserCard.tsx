import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserCardProps = {
  name: string;
  image: string;
};

export function UserCard({ name, image }: UserCardProps) {
  return (
    <Card className="mx-auto w-[200px] bg-transparent pt-2 shadow-lg">
      <CardContent className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={image} alt="avatar" />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold text-white">{name}</CardTitle>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
