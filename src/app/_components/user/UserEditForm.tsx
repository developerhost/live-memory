"use client";

import { type RouterOutputs } from "@/trpc/react";
import ImageUploading from "react-images-uploading";
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
import { useUserEditForm } from "./hooks/useUserEditForm";

type User = RouterOutputs["user"]["getUserById"];

export default function UserEditForm({ user }: { user: User }) {
  const { form, imageUpload, onSubmit, onChangeImage, isPending } =
    useUserEditForm(user);

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
