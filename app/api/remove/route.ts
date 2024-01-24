// api/remove/route.ts

import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const requestBody = await req.json();

    if (!requestBody || !requestBody.id) {
      return NextResponse.json({
        success: false,
        message: "Invalid request body or Todo id not provided",
      });
    }

    const { id: idOfTodoToRemove } = requestBody;

    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: Number(idOfTodoToRemove),
      },
    });

    if (!existingTodo) {
      return NextResponse.json({
        success: false,
        message: "Todo not found in the database",
      });
    }

    const removeTodo = await prisma.todo.delete({
      where: {
        id: Number(idOfTodoToRemove),
      },
    });

    if (removeTodo) {
      return NextResponse.json({
        success: true,
        message: "Todo removed successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to remove the todo! Please try again",
      });
    }
  } catch (e) {
    console.error(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
