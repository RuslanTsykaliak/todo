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
