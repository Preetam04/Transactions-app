import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, User as AuthUser } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import Account from "@/models/Account.model";
import Transaction from "@/models/Transactions.model";

export async function POST(req: Request) {
  const { to, amount } = await req.json();
  const newAmount = amount * 100;

  const authSession = await getServerSession(authOptions);

  const fromUser: AuthUser = authSession?.user as AuthUser;

  //   console.log(1000050 - newAmount);

  //   console.log(fromUser._id);

  try {
    dbConnect();
    const mongoSession = await mongoose.startSession();

    mongoSession.startTransaction();

    const fromAccount = await Account.findOne({
      user: fromUser._id,
    }).session(mongoSession);

    console.log(fromAccount);

    if (!fromAccount || amount > fromAccount.balance) {
      await mongoSession.abortTransaction();
      return Response.json(
        {
          message: "Insufficient balance",
        },
        {
          status: 404,
        }
      );
    }

    const toAccount = await Account.findOne({ user: to }).session(mongoSession);

    if (!toAccount) {
      await mongoSession.abortTransaction();
      return Response.json(
        {
          message: "Invalid account",
        },
        {
          status: 404,
        }
      );
    }

    await Account.updateOne(
      {
        user: fromUser._id,
      },
      { $inc: { balance: -newAmount } }
    ).session(mongoSession);

    await Account.updateOne(
      {
        user: to,
      },
      { $inc: { balance: newAmount } }
    ).session(mongoSession);

    const newTransaction = await new Transaction({
      from: fromAccount._id,
      to: to,
      newAmount,
    });

    await mongoSession.commitTransaction();

    return Response.json(
      {
        message: "Transaction was successfull",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
