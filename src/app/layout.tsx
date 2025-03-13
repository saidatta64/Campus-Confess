import "./globals.css";
import { Poppins } from "next/font/google";
import "./globals.css"; // Ensure you have global styles
import SessionWrapper from '../components/ui/SessionProvider'
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Add required weights
  variable: "--font-poppins",
});

export const metadata = {
  title: "Campus Confess",
  description: "Your App Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
    </SessionWrapper>
  );
}
