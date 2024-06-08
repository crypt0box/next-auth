"use client";

import { signUp } from "@/actions/sign-up";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, setIsPending] = useTransition();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    setError("");

    startTransition(async () => {
      const result = await signUp(values);

      if (!result.isSuccess) {
        setError(result.error.message);
        return;
      }

      toast.success(result.message);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ニックネーム</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="shadcn@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input placeholder="1234567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <Button type="submit" disabled={isPending}>
          アカウントを作成
        </Button>
      </form>
    </Form>
  );
};
