import { prisma } from "@/lib/auth-prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { category } = await req.json();

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );
  }

  const newCategory = await prisma.category.create({
    data: {
      name: category,
    },
  });

  return NextResponse.json(newCategory, { status: 201 });
}

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json({ categories }, { status: 200 });
}
