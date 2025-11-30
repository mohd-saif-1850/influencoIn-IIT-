import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/dbConnect";
import { User } from "@/src/models/User.model";
import { sendVerifyEmail } from "@/src/helpers/sendVerifyEmail";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email } = await request.json();

    if (!email) {
      throw new Error("Email is Required !");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not Found !");
    }

    if (user.verified) {
      throw new Error("User Already Verified !");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExp = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExp = otpExp;

    await user.save();

    await sendVerifyEmail({
      email: user.email,
      username: user.name,
      otp: otp.toString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Verification OTP Resent Successfully !"
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error while Resending OTP !"
      },
      { status: 500 }
    );
  }
}
