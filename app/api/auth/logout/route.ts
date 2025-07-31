import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth-prisma";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (sessionId) {
    await prisma.session.deleteMany({ where: { sid: sessionId } });
  }
  const response = NextResponse.json({ message: "Logout successful" });
  response.cookies.set("sessionId", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure:
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https"),
  });
  return response;
}
