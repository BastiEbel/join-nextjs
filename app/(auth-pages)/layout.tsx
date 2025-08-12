import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";
import { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Join App",
  description: "Browse and manage your tasks efficiently",
};

export default function AuthPageRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/joinLogoVector.png" />
      </head>
      <body>
        <Header />
        <div style={{ display: "flex" }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <ToastContainer
              position="top-center"
              hideProgressBar
              closeButton={false}
            />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
