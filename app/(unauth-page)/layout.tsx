import type { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Join App",
  description: "Browse and manage your tasks efficiently",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/joinLogoVector.png" />
      </head>

      <body>
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          closeButton={false}
        />
        {children}
      </body>
    </html>
  );
}
