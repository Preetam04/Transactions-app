import dbConnect from "@/lib/dbConnect";
import { getServerSession, User as AuthUser } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import User from "@/models/Users.model";
import Account from "@/models/Account.model";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);

    const user: AuthUser = session?.user as AuthUser;

    const userDetails = await Account.findOne({
      user: user._id,
    })
      .populate({
        path: "user", // The field in Account that references User
        select: "-password -__v", // Fields to include from User
      })
      .select("balance");

    userDetails.balance *= 0.01;

    // dummy response
    return Response.json(
      {
        success: true,
        message: "User Data fetched Successfully",
        data: userDetails,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error getting user data", error);
    return Response.json(
      {
        success: false,
        message: "Error getting user data.",
      },
      {
        status: 500,
      }
    );
  }
}
