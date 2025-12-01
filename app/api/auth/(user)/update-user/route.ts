import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/dbConnect";
import { User } from "@/src/models/User.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function PATCH(request: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?._id) {
      throw new Error("Unauthorized Access !");
    }

    const userId = session.user._id;
    const { name, username, gender, mobileNumber } = await request.json();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User Not Found !");
    }

    if (username) {
      const usernameExists = await User.findOne({
        username,
        _id: { $ne: userId }
      });

      if (usernameExists) {
        throw new Error("Username Already Taken !");
      }
    }

    if (name) {
      user.name = name;
    }

    if (username) {
      user.username = username;
    }

    if (gender) {
      user.gender = gender;
    }

    if (mobileNumber) {
      user.mobileNumber = mobileNumber;
    }

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Profile Updated Successfully !"
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error while Updating Profile !"
      },
      { status: 500 }
    );
  }
}
