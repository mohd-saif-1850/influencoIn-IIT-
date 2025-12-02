import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/src/models/User.model";
import { sendVerifyEmail } from "@/src/helpers/sendVerifyEmail";
import dbConnect from "@/src/lib/dbConnect";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { username, mobileNumber, email, password, role, category } = await request.json()

    if (!username) {
      throw new Error("Username is Required !");
    }

    if (!mobileNumber) {
      throw new Error("Mobile Number is Required !");
    }

    if (!email) {
      throw new Error("Email is Required !");
    }

    if (!password) {
      throw new Error("Password is Required !");
    }

    if (!role) {
      throw new Error("Role is Required !")
    }

    if (!category) {
      throw new Error("Category is Required !")
    }

    const existingUser = await User.findOne({ 
      $or : [
        {username},
        {email},
        {mobileNumber}
      ]
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false,
          message: "User Already Exists with the Same Mobile Number or Email !" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExp = new Date(Date.now() + 10 * 60 * 1000);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
    const newUser = new User({
      username,
      mobileNumber,
      email,
      password: hashedPassword,
      verified: false,
      otp,
      otpExp,
      otpExpiresAt,
      role,
      category
    });

    await newUser.save();
    await sendVerifyEmail({
      email,
      username,
      otp: otp.toString()
    });

    return NextResponse.json(
      { success: true,
        message: "User Created Successfully - Please Verify Your Email !" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error while Registering the User !" },
      { status: 500 }
    );
  }
}
