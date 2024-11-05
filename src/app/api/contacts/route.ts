import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

console.log("Database URL:", process.env.DATABASE_URL);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Accessing DATABASE_URL
    },
  },
});

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
  const { name, email } = await request.json();
  try {
    const newContact = await prisma.contact.create({
      data: {
        name,
        email,
      },
    });
    return NextResponse.json(newContact);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}

// DELETE a contact by ID
export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    await prisma.contact.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Contact deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
