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
import { createUser } from "../user-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        error: "Username minimal 3 karakter.",
      })
      .max(20, { error: "Username maksimal 20 karakter." }),
    email: z.email({ error: "Email tidak valid." }),
    password: z.string().min(6, { error: "Password minimal 6 karakter." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok.",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const res = await createUser({
      username: values.username,
      email: values.email,
      password: values.password,
    });

    if (res.success) {
      toast.success("Berhasil mendaftar.", {
        position: "top-right",
        style: { backgroundColor: "green", color: "white" },
      });

      router.push("/auth/sign-in");
    } else {
      toast.error(res.error, {
        position: "top-right",
        style: { backgroundColor: "red", color: "white" },
      });
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
        <h1 className="font-bold">Buat Akun</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukkan Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Ulangi Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="text-sm">
          Sudah Punya Akun?{" "}
          <Link href="/auth/sign-in" className="hover:underline">
            Sign In
          </Link>
        </p>
      </Form>
    </div>
  );
}
