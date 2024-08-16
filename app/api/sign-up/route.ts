import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, username, password, firstName, lastName } =
      await request.json();

    // const existingUser = await User.findOne({
    //   username,
    // });

    // if (existingUser) {
    //   return Response.json(
    //     {
    //       success: false,
    //       message: "Username already exists",
    //     },
    //     {
    //       status: 400,
    //     }
    //   );
    // }

    const existingEmail = await User.findOne({
      email,
    });

    if (existingEmail) {
      return Response.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    await newUser.save();

    return Response.json(
      {
        success: true,
        message: "User Registered successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
