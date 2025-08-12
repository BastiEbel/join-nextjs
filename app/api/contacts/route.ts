import { prisma } from "@/lib/auth-prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, phone, userId, zipCode } = await req.json();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  const contact = await prisma.contact.create({
    data: {
      name,
      email,
      phone,
      userId,
      zipCode,
    },
  });

  return NextResponse.json(
    { contact, message: "Contact created successfully" },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  const userId = req.headers.get("User-Id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const contacts = await prisma.contact.findMany({
    where: { userId },
  });

  return NextResponse.json({ contacts }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const userId = req.headers.get("User-Id");
  const contactId = req.headers.get("Contact-Id");

  if (!userId || !contactId) {
    return NextResponse.json(
      { error: "User ID and contact ID are required" },
      { status: 400 }
    );
  }

  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
  });

  if (!contact || contact.userId !== userId) {
    return NextResponse.json(
      { error: "Contact not found or access denied" },
      { status: 404 }
    );
  }

  await prisma.contact.delete({
    where: { id: contactId },
  });

  return NextResponse.json(
    { message: "Contact deleted successfully" },
    { status: 200 }
  );
}

export async function PUT(req: NextRequest) {
  const { name, email, phone, zipCode } = await req.json();
  const id = req.headers.get("Contact-Id");

  if (!id || !name || !email) {
    return NextResponse.json(
      { error: "ID, name, and email are required" },
      { status: 400 }
    );
  }

  const contact = await prisma.contact.update({
    where: { id },
    data: {
      name,
      email,
      phone,
      zipCode,
    },
  });

  return NextResponse.json(
    { contact, message: "Contact updated successfully" },
    { status: 200 }
  );
}
