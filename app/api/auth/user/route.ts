import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/auth-prisma";

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("sessionId")?.value;
  if (!sessionId) return NextResponse.json({ user: null }, { status: 401 });

  const session = await prisma.session.findUnique({
    where: { sid: sessionId },
    include: { user: true },
  });
  if (!session) return NextResponse.json({ user: null }, { status: 401 });

  return NextResponse.json({
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    },
  });
}
