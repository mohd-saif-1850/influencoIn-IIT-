import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/dbConnect";
import { User } from "@/src/models/User.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function DELETE() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?._id) {
      throw new Error("Unauthorized Access !");
    }

    const userId = session.user._id;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User Not Found !");
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json(
      {
        success: true,
        message: "User Deleted Successfully !"
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error while Deleting User !"
      },
      { status: 500 }
    );
  }
}
