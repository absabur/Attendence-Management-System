import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Links from "@/components/Links";

import Logo from "/public/logo.png";
import Toast from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Attendence Management System",
  description: "This is a attendence app for polytechnic institutes.",
};

export default function RootLayout({ children }) {
  console.log(Logo.src);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toast />
        <div className="teacher-details">
          <div>
            <Link className="logo" href={`/`}>
              <img className="logo" src={Logo.src} alt="AMS" width={100} />
            </Link>
          </div>
          <Links />
        </div>

        <div style={{ width: "100%" }}>{children}</div>

        <div className="footer">
          Copyright &copy;2024 by CST (2021-2022) BPI
        </div>
      </body>
    </html>
  );
}
