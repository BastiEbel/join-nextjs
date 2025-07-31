import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/auth-prisma";
import { ContactData } from "@/types/type-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const contactId = searchParams.get("contactId");
  let tasks;
  if (contactId) {
    tasks = await prisma.addTask.findMany({
      where: {
        createdById: userId ?? undefined,
        contacts: { some: { id: contactId } },
      },
    });
  } else {
    tasks = await prisma.addTask.findMany({
      where: { createdById: userId ?? undefined },
    });
  }
  return NextResponse.json(tasks ?? []);
}

export async function POST(req: NextRequest) {
  const {
    title,
    description,
    contacts,
    category,
    userId,
    dueDate,
    prio,
    status,
  } = await req.json();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const newTask = await prisma.addTask.create({
    data: {
      title,
      description,
      dueDate: new Date(dueDate),
      prio,
      category: typeof category === "object" ? category.label : category,
      status: status || "To Do",
      contacts: { connect: contacts.map((c: ContactData) => ({ id: c })) },
      createdBy: { connect: { id: userId } },
    },
  });
  return NextResponse.json({ newTask, message: "Task successfully" });
}
