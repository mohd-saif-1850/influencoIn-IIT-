import * as React from "react";
import { Html, Head, Body, Container, Section, Text } from "@react-email/components";

interface VerifyOtpEmailProps {
  username: string;
  otp: string;
}

export const VerifyOtpEmail = ({ username, otp }: VerifyOtpEmailProps) => {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#fafafa",
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
            border: "1px solid #f0f0f0",
            padding: "35px 40px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.04)",
          }}
        >
          {/* Header */}
          <Section style={{ textAlign: "center", marginBottom: "25px" }}>
            <Text
              style={{
                fontSize: "30px",
                fontWeight: "700",
                color: "#111",
                margin: 0,
              }}
            >
              Influenco
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "#777",
                marginTop: "5px",
              }}
            >
              Empowering Digital Creators
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginBottom: "20px" }}>
            <Text
              style={{
                fontSize: "18px",
                color: "#222",
                marginBottom: "10px",
              }}
            >
              Hey <strong>{username}</strong>,
            </Text>

            <Text style={{ fontSize: "15px", color: "#555", lineHeight: "22px" }}>
              Use the OTP below to verify your email and continue setting up your Influenco account.
            </Text>
          </Section>

          <Section style={{ textAlign: "center", margin: "30px 0" }}>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#f8f0ff",
                border: "2px solid #d7b5ff",
                borderRadius: "14px",
                padding: "20px 28px",
                fontSize: "36px",
                fontWeight: "700",
                color: "#8a33ff",
                letterSpacing: "10px",
              }}
            >
              {otp}
            </div>

            <Text
              style={{
                marginTop: "12px",
                fontSize: "14px",
                color: "#666",
              }}
            >
              OTP expires in <strong>10 minutes</strong>.
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginTop: "25px" }}>
            <Text style={{ fontSize: "14px", color: "#777" }}>
              If this wasn't you, please ignore this email.
            </Text>
          </Section>
        </Container>

        <Section style={{ textAlign: "center", marginTop: "25px" }}>
          <Text style={{ fontSize: "12px", color: "#999" }}>
            © {new Date().getFullYear()} Influenco — All Rights Reserved
          </Text>
        </Section>
      </Body>
    </Html>
  );
};
