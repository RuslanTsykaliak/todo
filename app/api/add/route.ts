// api/add/route.ts

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import xss from "xss";

export async function POST(req: Request) {
  const { title, description, priority } = await req.json();

  // Sanitize title and description to prevent XSS attacks
  const sanitizedTitle = xss(title);
  const sanitizedDescription = xss(description);

  if (!sanitizedTitle || !sanitizedDescription) {
    return NextResponse.json(
      { error: "Title and content are required." },
      { status: 500 }
    );
  }

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title: sanitizedTitle,
        description: sanitizedDescription,
        priority,
      },
    });

    console.log("Todo created");
    return NextResponse.json(newTodo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Could not create todo." });
  }
}

export async function GET() {
  try {
    const Todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(Todos);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Some error occurred" },
      { status: 500 }
    );
  }
}
