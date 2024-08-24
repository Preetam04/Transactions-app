"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import formatCurrency from "@/lib/formatCurrency";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  // const session = await getSession(context);
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true);
  const [allUser, setAllUser] = useState([]);

  const router = useRouter();

  // const session = await getServerSession(authOptions);
  const getUserDetails = async () => {
    setLoader(true);
    try {
      const response = await axios.get("/api/get-user-details");
      console.log(response.data.data);
      setUser(response.data.data);

      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/get-all-users");
      // console.log(response.data.data);
      setAllUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(allUser);

  useEffect(() => {
    getUserDetails();
    getAllUsers();
  }, []);

  const handleNavigation = (data) => {
    router.push(`/send-money/${data?._id}`);
  };

  return loader ? (
    <div className="">loader</div>
  ) : (
    <div className="px-8 py-5">
      <Navbar user={user?.user} />
      <div className="mt-8 px-4 ">
        <div className="">
          <h1 className="text-2xl font-bold ">Hello {user.user.firstName},</h1>

          <p className="text-lg text-gray-600 font-semibold ">
            Your balance is <span>Rs {formatCurrency(user.balance)}</span>.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-6">Users</h3>
        <Input
          type="text"
          placeholder="Search User"
          className="mt-4 w-full max-w-96 h-8"
        />

        <div className="px-2 py-6">
          {/* Users */}
          {allUser.length !== 0 &&
            allUser.map((ele, key) => (
              <div key={key} className="flex ">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-300 w-fit  rounded-full p-4 leading-3 text-lg cursor-pointer">
                      {ele.firstName.slice(0, 1)}
                    </div>
                    <div className=" ml-3 leading-3">
                      <p className="text-xl">
                        {ele.firstName} {ele.lastName}
                      </p>
                      <p className="text-sm text-gray-600 -my-1">{ele.email}</p>
                    </div>{" "}
                  </div>
                  <Button
                    onClick={() => {
                      handleNavigation(ele);
                    }}
                  >
                    Send Money
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
