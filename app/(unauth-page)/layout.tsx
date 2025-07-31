import type { Metadata } from "next";
import "../globals.css";

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
      <body>{children}</body>
    </html>
  );
}
