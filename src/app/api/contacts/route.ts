import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all contacts
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

// POST a new contact
export async function POST(request: Request) {
  const data = await request.json();
  console.log("Received data:", data);
  const { name, email, phone, address } = data;

  try {
    const newContact = await prisma.contact.create({
      data: { name, email, phone, address },
    });
    return NextResponse.json(newContact);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
