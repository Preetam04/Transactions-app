import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen bg-[#7F7E7E] flex items-center justify-center">
      <div className="w-full max-w-sm h-[30rem] bg-white rounded-md drop-shadow p-6">
        <h1 className="text-4xl font-bold text-center tracking-tight">
          Sign In
        </h1>
        <p className="text-center mt-3.5 text-base leading-5  text-slate-500">
          Enter your credentials to access your account
        </p>

        <Button className="w-full justify-self-end mt-10 ">Submit</Button>
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

export default page;
