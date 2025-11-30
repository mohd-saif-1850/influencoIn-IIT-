import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/dbConnect";
import { User } from "@/src/models/User.model";
import bcrypt from "bcryptjs";

export async function PATCH(request: Request) {
  try {
    await dbConnect();

    const { email, newPassword, otp } = await request.json();

    if (!email || !newPassword || !otp) {
      throw new Error("Email, OTP and New Password are Required !");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not Found !");
    }

    if (user.otp !== Number(otp)) {
      throw new Error("Invalid OTP !");
    }

    if (!user.otpExp || user.otpExp < new Date()) {
      throw new Error("OTP has Expired !");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExp = undefined;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Password Reset Successfully !"
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error while Resetting Password !"
      },
      { status: 500 }
    );
  }
}
