"use client";

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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

const signInSchema = z.object({
  email: z.email({ error: "Email tidak valid." }),
  password: z.string().min(1, { error: "Password harus diisi." }),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!res?.ok) {
      toast.error(res?.error, {
        position: "top-right",
        style: { backgroundColor: "red", color: "white" },
      });
    } else {
      toast.success("Berhasil masuk.", {
        position: "top-right",
        style: { backgroundColor: "green", color: "white" },
      });

      setTimeout(() => {
        redirect("/dashboard");
      }, 2000);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full max-w-md p-8 rounded-md bg-white shadow">
      <Form {...form}>
        <Image
          src="/images/school-logo.png"
          alt="Logo Sekolah"
          width={100}
          height={100}
          priority
        />
        <h1 className="font-bold">Masuk</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Masukkan Email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Masukkan Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <p className="text-sm">
          Belum Punya Akun?{" "}
          <Link href="/auth/sign-up" className="hover:underline">
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  );
}
