import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
  gender?: string,
  profilePic?: string,
  profilePicId: string,
  otp?: number;
  otpExp?: Date;
  verified?: boolean;
  role?: string;
  subscription?: boolean;
  otpExpiresAt?: Date;
}

const userSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      default: "No Name",
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: 'https://res.cloudinary.com/dlzi244at/image/upload/v1763367677/defaultPersonImage_exseqc.avif'
    },

    profilePicId: String,

    gender: {
      type: String,
      default: "Not Specified"
    },

    otp: Number,

    otpExp: Date,

    verified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "user",
    },

    subscription: {
      type: Boolean,
      default: false,
    },

    otpExpiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000),
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.verified) {
    this.otpExpiresAt = undefined;
  } else {
    if (!this.otpExpiresAt) {
      this.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    }
  }
});

export const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);
