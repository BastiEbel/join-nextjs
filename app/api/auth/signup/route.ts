import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/auth-prisma";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  const sessionId = randomUUID();

  await prisma.session.create({
    data: {
      sid: sessionId,
      userId: newUser.id,
      expire: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  const response = NextResponse.json(
    { user: { id: newUser.id, email: newUser.email, name: newUser.name } },
    { status: 201 }
  );
  response.cookies.set("sessionId", sessionId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    secure:
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https"),
  });
  return response;
}
