import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type UserCardProps = {
  id: string;
  name: string;
  image: string;
};

export function UserCard({ id, name, image }: UserCardProps) {
  return (
    <Card className="mx-auto w-[200px] bg-white bg-opacity-10 pt-2 shadow-lg">
      <CardContent className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={image} alt="avatar" />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <Link href={`/user/${id}`}>
            <CardTitle className="text-lg font-bold text-white">
              {name}
            </CardTitle>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
