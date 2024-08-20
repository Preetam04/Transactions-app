"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/verificationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession, signIn, signOut } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignIn = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    // event.preventDefault()
    console.log(values);

    const res = await signIn("credentials", {
      redirect: true,
      email: values.email,
      password: values.password,
    });

    // log(res);
    console.log(res);

    if (res?.error) {
      console.log(res?.error);
    } else {
      router.push("/dashboard"); // Redirect to a protected page upon successful login
    }

    // try {

    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="w-full h-screen bg-[#7F7E7E] flex items-center justify-center">
      <div className="w-full max-w-sm h-[30rem] bg-white rounded-md drop-shadow p-6">
        <h1 className="text-4xl font-bold text-center tracking-tight">
          Sign In
        </h1>
        <p className="text-center mt-3.5 text-base leading-5  text-slate-500">
          Enter your credentials to access your account
        </p>

        <div className=" my-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" type="email" {...field} />
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
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full justify-self-end mt-10 ">Submit</Button>
            </form>
          </Form>
        </div>

        <p className="text-center mt-3.5 text-sm leading-5  text-slate-500">
          Not a member?{" "}
          <Link href={"/sign-up"}>
            <span className="font-semibold hover:text-primary underline cursor-pointer">
              Sign-Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

// "use client";

// import { useSession, signIn, signOut } from "next-auth/react";
// export default function Component() {
//   const { data: session } = useSession();
//   if (session) {
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     );
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()}>Sign in</button>
//     </>
//   );
// }
