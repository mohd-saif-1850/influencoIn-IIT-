import { Resend } from "resend";
import { render } from "@react-email/render";
import { ForgotOtpEmail } from "@/src/emails/forgotEmailLayout";

interface ForgotOtpProps {
  email: string;
  username: string;
  otp: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendForgotOtpEmail = async ({
  email,
  username,
  otp,
}: ForgotOtpProps) => {
  try {
    const emailHtml = await render(
      <ForgotOtpEmail username={username} otp={otp} />
    );

    const response = await resend.emails.send({
      from: "Influenco <support@influenco.in>",
      to: email,
      subject: "Your Password Reset OTP",
      html: emailHtml,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending forgot OTP email:", error);
    return { success: false, error };
  }
};
