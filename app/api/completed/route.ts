// api/completed/route.ts

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const { method } = req;

  try {
    if (method === 'PUT') {
      return handlePut(req);
    } else {
      return handleMethodNotAllowed();
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    return handleInternalServerError();
  }
}

async function handlePut(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { id, completed } = requestBody;

    if (id === undefined) {
      return NextResponse.json({
        success: false,
        message: "Missing 'id' in the request body",
      });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed },
    });

    return handleSuccessResponse(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return handleInternalServerError();
  }
}

function handleSuccessResponse(data: any) {
  return NextResponse.json(data);
}

function handleMethodNotAllowed() {
  return NextResponse.json({
    success: false,
    message: "Method Not Allowed",
  });
}

function handleInternalServerError() {
  return NextResponse.json({
    success: false,
    message: "Internal Server Error",
  });
}
