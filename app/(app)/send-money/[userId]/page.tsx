"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SendMoney = ({ params }) => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [amount, setAmount] = useState();

  const getReceiverData = async (data) => {
    try {
      const response = await axios.get(`/api/get-user-data/${data}`);
      // console.log(response.data.data);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!params.userId) {
      router.back();
    }
    getReceiverData(params.userId);
  }, [params.userId]);

  const sendMoney = async () => {
    if (!amount) return;
    const transactionData = {
      to: userData?._id,
      amount: amount,
    };

    // console.log(transactionData);
    try {
      const response = await axios.post("/api/send-money", transactionData);
      console.log(response);
      toast({
        title: response.data.message,
      });
      router.back();
    } catch (error) {
      console.log(error);
      // toast({
      //   title: error,
      // });
    }
  };

  return !userData ? (
    <div>Loader</div>
  ) : (
    <div className="w-full h-screen bg-[#7F7E7E] flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
          <CardDescription>
            Send Money to {userData?.firstName} {userData?.lastName}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Amount</Label>
                <Input
                  id="name"
                  placeholder="Enter amount"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    // console.log(e.target.value);
                    e.preventDefault();
                    const num = e.target.valueAsNumber;

                    if (num) {
                      setAmount(parseFloat(num));
                    }
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              sendMoney();
            }}
          >
            Send
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SendMoney;
