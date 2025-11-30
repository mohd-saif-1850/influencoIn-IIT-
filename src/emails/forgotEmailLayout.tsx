import * as React from "react";
import { Html, Head, Body, Container, Section, Text } from "@react-email/components";

interface ForgotOtpEmailProps {
  username: string;
  otp: string;
}

export const ForgotOtpEmail = ({ username, otp }: ForgotOtpEmailProps) => {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#fff7ed",
          fontFamily: "'Inter', sans-serif",
          margin: 0,
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "550px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "18px",
            border: "1px solid #ffe3c4",
            padding: "35px 40px",
            boxShadow: "0 8px 24px rgba(255, 149, 0, 0.1)",
          }}
        >
          <Section style={{ textAlign: "center", marginBottom: "25px" }}>
            <Text
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#ff8800",
                margin: 0,
              }}
            >
              Influenco
            </Text>

            <Text
              style={{
                fontSize: "14px",
                color: "#b86500",
                marginTop: "5px",
              }}
            >
              Password Reset OTP
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginBottom: "20px" }}>
            <Text
              style={{
                fontSize: "17px",
                color: "#333",
                marginBottom: "10px",
              }}
            >
              Hi <strong>{username}</strong>,
            </Text>

            <Text
              style={{
                fontSize: "15px",
                color: "#555",
                lineHeight: "24px",
              }}
            >
              Use the OTP below to reset your password.
            </Text>
          </Section>

          <Section style={{ textAlign: "center", margin: "30px 0" }}>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#fff2d6",
                border: "2px solid #ff9900",
                borderRadius: "14px",
                padding: "18px 30px",
                fontSize: "34px",
                fontWeight: "700",
                color: "#ff8800",
                letterSpacing: "10px",
              }}
            >
              {otp}
            </div>

            <Text
              style={{
                marginTop: "15px",
                fontSize: "13px",
                color: "#888",
              }}
            >
              OTP expires in <strong>10 minutes</strong>.
            </Text>
          </Section>
        </Container>

        <Section style={{ textAlign: "center", marginTop: "25px" }}>
          <Text
            style={{
              fontSize: "12px",
              color: "#b86500",
            }}
          >
            © {new Date().getFullYear()} Influenco — For Digital Creators
          </Text>
        </Section>
      </Body>
    </Html>
  );
};
