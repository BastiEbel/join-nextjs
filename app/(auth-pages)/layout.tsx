import Header from "@/components/header/header";
import Navbar from "@/components/navbar/navbar";

export default function AuthPageRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Navbar />
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </>
  );
}
