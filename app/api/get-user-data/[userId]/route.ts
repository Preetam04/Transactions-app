import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users.model";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { useId } from "react";

export async function GET(req, { params }: { params: { slug: string } }) {
  // console.log(userId);
  const { userId } = params;

  if (!userId) {
    return Response.json(
      {
        error: "Please provide a userId!",
      },
      {
        status: 404,
      }
    );
  }

  try {
    await dbConnect();

    const userDetails = await User.findById(userId).select("-password -__v");

    if (!userDetails) {
      return Response.json(
        {
          error: "User with this id doesn't exists",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User data fetched successfully",
        data: userDetails,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        error: "Something went wrong!",
      },
      {
        status: 500,
      }
    );
  }
}
