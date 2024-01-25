// api/add/route.ts

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import xss from "xss";

export async function POST(req: Request) {
  const { title, description, priority } = await req.json();
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
