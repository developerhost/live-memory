"use client";

import { api, type RouterOutputs } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploading, { type ImageListType } from "react-images-uploading";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

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
      introduction: user.introduction ?? "",
    },
  });

  const { mutate: updateUser, isPending } = api.user.updateUser.useMutation({
    onSuccess: () => {
      toast.success("ユーザー情報を更新しました");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<InputType> = (data) => {
    let base64Image;

    if (imageUpload[0]?.dataURL?.startsWith("data:image")) {
      base64Image = imageUpload[0].dataURL;
    }
    updateUser({
      name: data.name,
      introduction: data.introduction,
      base64Image,
    });
  };

  const onChangeImage = (imageList: ImageListType) => {
    const file = imageList[0]?.file;
    const maxFileSize = 5 * 1024 * 1024;

    if (file && file.size > maxFileSize) {
      toast.error("5MB以下の画像を選択してください");
      return;
    }

    setImageUpload(imageList);
  };

  return (
    <div>
      <Form {...form}>
        <div>
          <ImageUploading
            value={imageUpload}
            onChange={onChangeImage}
            maxNumber={1}
            acceptType={["jpg", "jpeg", "png"]}
          >
            {({ imageList, onImageUpdate }) => (
              <div className="flex w-full flex-col items-center justify-center">
                {imageList.map((image, index) => (
                  <div key={index}>
                    {image.dataURL && (
                      <div className="relative h-24 w-24">
                        <Image
                          fill
                          src={image.dataURL}
                          alt={user.name ?? "avatar"}
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}

                {imageList.length > 0 && (
                  <div className="mt-3 text-center">
                    <Button
                      variant="outline"
                      onClick={() => onImageUpdate(0)}
                      className="text-black"
                    >
                      アバターを変更
                    </Button>
                  </div>
                )}
              </div>
            )}
          </ImageUploading>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input placeholder="名前" {...field} max={50} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="introduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>自己紹介</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="自己紹介"
                    {...field}
                    rows={10}
                    maxLength={200}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" disabled={isPending} className="w-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            変更
          </button>
        </form>
      </Form>
    </div>
  );
}
