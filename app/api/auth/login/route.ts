import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/auth-prisma";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const sessionId = randomUUID();

  await prisma.session.create({
    data: {
      sid: sessionId,
      userId: user.id,
      expire: new Date(Date.now() + 1000 * 60 * 60),
    },
  });
  const response = NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name },
    message: "Login successful",
  });
  response.cookies.set("sessionId", sessionId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
    sameSite: "lax",
    secure:
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https"),
  });
  return response;
}
