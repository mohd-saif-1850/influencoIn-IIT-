import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/dbConnect";
import { User } from "@/src/models/User.model";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

export async function PATCH(request: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?._id) {
      throw new Error("Unauthorized Access !");
    }

    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      throw new Error("Both Old and New Password are Required !");
    }

    const user = await User.findById(session.user._id);
    if (!user) {
      throw new Error("User Not Found !");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Invalid Old Password !");
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Password Changed Successfully !"
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error while Changing Password !"
      },
      { status: 500 }
    );
  }
}
