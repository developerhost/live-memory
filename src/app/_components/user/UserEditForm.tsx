"use client";

import { api, type RouterOutputs } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploading, { type ImageListType } from "react-images-uploading";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string().min(1, { message: "名前は必須です" }).max(50, {
    message: "名前は50文字以内です",
  }),
  introduction: z
    .string()
    .max(200, { message: "自己紹介は200文字以内です" })
    .optional(),
});

type InputType = z.infer<typeof schema>;

type User = RouterOutputs["user"]["getUserById"];

export default function UserEditForm({ user }: { user: User }) {
  const router = useRouter();

  const [imageUpload, setImageUpload] = useState<ImageListType>([
    {
      dataURL: user.image ?? "/assets/img/default.png",
    },
  ]);

  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name ?? "名無し",
      introduction: (user.introduction as string) ?? "",
    },
  });

  const {mutate: updateUser, isLoading} = api.user

  return <form></form>;
}
