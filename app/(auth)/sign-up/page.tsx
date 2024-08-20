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
import { toast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/lib/verificationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Signup = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  // resolver: zodResolver(signUpSchema),
  //   defaultValues: {
  //     username: "",
  //     email: "",
  //     password: "",
  //     lastName: "",
  //     firstName: ""
  //   },

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    // console.log(values);

    try {
      const response = await axios.post("/api/sign-up", values);

      toast({
        title: "Success",
        description: response?.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#7F7E7E] flex items-center justify-center">
      <div className="w-full max-w-md min-h-[30rem] bg-white rounded-md drop-shadow p-6">
        <h1 className="text-4xl font-bold text-center tracking-tight">
          Sign Up
        </h1>
        <p className="text-center mt-3.5 text-base leading-5  text-slate-500">
          Enter your credentials to create your account
        </p>

        <div className=" my-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className=" flex justify-between flex-row gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="first name"
                          type="firstName"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="last name"
                          type="lastname"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <Button type="submit" className="w-full justify-self-end mt-10 ">
                Create Account
              </Button>
            </form>
          </Form>
        </div>
        <p className="text-center mt-3.5 text-sm leading-5  text-slate-500">
          Aready have a account?{" "}
          <Link href={"/sign-in"}>
            <span className="font-semibold hover:text-primary underline cursor-pointer">
              Sign-In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
