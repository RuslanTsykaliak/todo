import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const extractQuery = url.searchParams.get("query");

    const searchTaskList = await prisma.task.findMany({
      where: {
        OR: [
          {
            title: {
              contains: extractQuery || "",
            },
          },
          {
            description: {
              contains: extractQuery || "",
            },
          },
        ],
      },
    });

    if (searchTaskList) {
      return NextResponse.json({
        success: true,
        data: searchTaskList,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to search results",
      });
    }
  } finally {
    
  }
  // catch (e) {
  //   console.log(e);

  //   return NextResponse.json({
  //     success: false,
  //     message: "Something went wrong ! Please try again",
  //   });
  // }
}