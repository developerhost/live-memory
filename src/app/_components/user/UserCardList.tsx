import React from "react";
import { UserCard } from "./UserCard";

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};

type UserCardListProps = {
  users: User[];
};

export function UserCardList({ users }: UserCardListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          email={user.email}
          avatarUrl={user.avatarUrl}
        />
      ))}
    </div>
  );
}

export default UserCardList;
