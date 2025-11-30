import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { ForgotOtpEmail } from "@/src/emails/forgotEmailLayout";

interface ForgotOtpProps {
  email: string;
  username: string;
  otp: string;
}

export const sendForgotOtpEmail = async ({ email, username, otp }: ForgotOtpProps) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHtml = await render(
      <ForgotOtpEmail username={username} otp={otp} />
    );

    await transporter.sendMail({
      from: `"Influenco" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Password Reset OTP",
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    console.log("Error sending forgot OTP email:", error);
    return { success: false };
  }
};
