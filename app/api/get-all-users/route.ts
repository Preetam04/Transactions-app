import dbConnect from "@/lib/dbConnect";
import { getServerSession, User as AuthUser } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import User from "@/models/Users.model";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);

    const user: AuthUser = session?.user as AuthUser;
    console.log(user);

    const allUser =
      (await User.find({
        _id: { $ne: new mongoose.Types.ObjectId(user._id) },
      }).select("-password -__v")) || [];

    // console.log(allUser);
    return Response.json(
      {
        success: true,
        message: "All users fetched Successfully",
        data: allUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Something went Wrong",
      },
      {
        status: 500,
      }
    );
  }
}
