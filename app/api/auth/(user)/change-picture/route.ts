import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/dbConnect";
import { User } from "@/src/models/User.model";
import cloudinary from "@/src/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

export async function PATCH(request: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?._id) {
      throw new Error("Unauthorized Access !");
    }

    const userId = session.user._id;
    const { image } = await request.json();

    if (!image) {
      throw new Error("Image is Required !");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User Not Found !");
    }

    if (user.profilePicId) {
      await cloudinary.uploader.destroy(user.profilePicId);
    }

    const upload = await cloudinary.uploader.upload(image, {
      folder: "influenco/profile",
    });

    user.profilePic = upload.secure_url;
    user.profilePicId = upload.public_id;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Profile Picture Updated Successfully !",
        profilePic: upload.secure_url
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error while Updating Profile Picture !"
      },
      { status: 500 }
    );
  }
}
