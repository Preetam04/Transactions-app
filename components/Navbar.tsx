"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, X } from "lucide-react";

interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

import { signOut } from "next-auth/react";

interface NavProps {
  user: User;
}

const Navbar: React.FC<NavProps> = ({ user }) => {
  const [openTab, setOpenTab] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to the homepage or another page after logout
  };

  return (
    <div className="flex justify-between items-center ring-1 ring-gray-400 py-4 px-6 rounded-xl relative">
      <h3 className="text-2xl font-semibold">Paytm App</h3>

      <div
        className="bg-gray-300  rounded-full p-4 leading-3 text-lg cursor-pointer uppercase"
        onClick={() => {
          setOpenTab((prev) => !prev);
        }}
      >
        {user.firstName.slice(0, 1)}
      </div>
      {openTab && (
        <div className="absolute w-32 ring-1 ring-gray-300 bg-white right-10  top-16 rounded-md px-4 py-2 shadow-md">
          <X
            className="absolute right-2 w-4 cursor-pointer text-gray-600"
            onClick={() => {
              setOpenTab((prev) => !prev);
            }}
          />
          <p className="text-base leading-5">
            <span className="text-sm text-gray-600 ">Hello,</span>
            <br />
            {user.firstName}
          </p>

          <Button
            variant="ghost"
            className="text-sm  mt-1 text-red-600 hover:text-red-600 p-0 hover:underline"
            size={"sm"}
            onClick={() => {
              handleLogout();
            }}
          >
            <LogOut className="w-4 h-4 mr-1" />
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
