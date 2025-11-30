import { NextResponse } from "next/server";
import { User } from "@/src/models/User.model";
import dbConnect from "@/src/lib/dbConnect";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, otp } = await request.json();

    if (!email) {
      throw new Error("Email is Required !");
    }

    if (!otp) {
      throw new Error("OTP is Required !");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User Not Found !");
    }

    if (user.verified) {
      throw new Error("User Already Verified !");
    }

    if (user.otp !== Number(otp)) {
      throw new Error("Invalid OTP !");
    }

    if ( !user.otpExp || user.otpExp < new Date()) {
      throw new Error("OTP has Expired !");
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Account Verified Successfully !",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error while Verifying Account !",
      },
      { status: 500 }
    );
  }
}
