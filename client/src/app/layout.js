import { Inter } from "next/font/google";
import GoogleAnalytics from './components/GoogleAnalytics';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Preppyy: Your AI-Interview prep bot!",
  description: "AI-based mock interview practice with personalized preparation analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <GoogleAnalytics />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
