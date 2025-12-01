import { Resend } from "resend";
import { render } from "@react-email/render";
import { VerifyOtpEmail } from "@/src/emails/sendVerificationEmail";

interface SendVerifyEmailProps {
  email: string;
  username: string;
  otp: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerifyEmail = async ({
  email,
  username,
  otp,
}: SendVerifyEmailProps) => {
  try {
    const emailHtml = await render(
      <VerifyOtpEmail username={username} otp={otp} />
    );

    const response = await resend.emails.send({
      from: "Influenco <support@influenco.in>",
      to: email,
      subject: "Verify your Influenco account",
      html: emailHtml,
    });

    return { success: true, message: "Verification email sent successfully", data: response };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send verification email", error };
  }
};
