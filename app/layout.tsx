import "./globals.css";
import Navbar from "@/src/components/Navbar";
import SessionWrapper from "@/src/SessionWrapper";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
      <SessionWrapper>
        <Navbar />
        <div className="">{children}</div>
      </SessionWrapper>
      </body>
    </html>
  );
}
