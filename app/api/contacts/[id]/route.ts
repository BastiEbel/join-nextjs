import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/auth-prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId)
    return NextResponse.json({ error: "No userId" }, { status: 400 });
  const contacts = await prisma.contact.findMany({ where: { userId } });
  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
  const { name, email, phone, zipCode, userId } = await req.json();
  if (!zipCode)
    return NextResponse.json({ error: "zipCode is required" }, { status: 400 });
  const newContact = await prisma.contact.create({
    data: { name, email, phone, zipCode, userId },
  });
  return NextResponse.json(newContact);
}
