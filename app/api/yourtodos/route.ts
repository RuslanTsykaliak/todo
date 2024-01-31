// api/yourtodos/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('userId');
    let todos;
    if (userId) {
      todos = await prisma.todo.findMany({
        where: {
          userId: String(userId),
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}


export async function PUT(req: NextRequest) {
  const requestBody = await req.json();
  if (req.method === 'PUT') {
    const { id, title, description, priority, userId } = requestBody;

    try {
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: {
          title,
          description,
          priority: Number(priority),
          userId,
        },
      });

      if (updatedTodo) {
        console.log({ message: 'Todo updated successfully' });
        return NextResponse.json(updatedTodo);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      return NextResponse.json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}