import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { VerifyOtpEmail } from "@/src/emails/sendVerificationEmail";

interface SendVerifyEmailProps {
  email: string;
  username: string;
  otp: string;
}

export const sendVerifyEmail = async ({ email, username, otp }: SendVerifyEmailProps) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHtml = await render(
      <VerifyOtpEmail username={username} otp={otp} />
    );

    const mailOptions = {
      from: `"Influenco" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your Influenco account",
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send verification email" };
  }
};
