// api/getalltodos/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const getAllTodos = await prisma.todo.findMany();
    if (getAllTodos && getAllTodos.length) {
      return NextResponse.json({
        success: true,
        data: getAllTodos,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No todos found.",
      }, { status: 404 });
    }
  } catch (e) {
    console.error("Error fetching todos:", e);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch todos. Please try again",
    }, { status: 500 });
  }
}