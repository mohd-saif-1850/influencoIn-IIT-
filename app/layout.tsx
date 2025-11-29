import "./globals.css";
import Navbar from "@/src/components/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Navbar />
        <div className="mt-[-50px]">{children}</div>
      </body>
    </html>
  );
}
