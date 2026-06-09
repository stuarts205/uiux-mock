import { db } from "@/config/db";
import { ProjectTable, ScreenConfigTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userInput, device, projectId } = await request.json();
  const user = await currentUser();

  const [result] = await db
    .insert(ProjectTable)
    .values({
      projectId: projectId,
      userInput: userInput,
      device: device,
      userId: user?.primaryEmailAddress?.emailAddress as string,
    })
    .returning();

  return NextResponse.json(result);
}

export async function GET(request: NextRequest) {
  const projectId = request.nextUrl.searchParams.get("projectId");
  const user = await currentUser();

  try {
    const result = await db
      .select()
      .from(ProjectTable)
      .where(
        and(
          eq(ProjectTable.projectId, projectId as string),
          eq(
            ProjectTable.userId,
            user?.primaryEmailAddress?.emailAddress as string,
          ),
        ),
      );

      const screenConfig = await db
        .select()
        .from(ScreenConfigTable)
        .where(eq(ScreenConfigTable.projectId, projectId as string));

      const responseData = {
        projectDetail: result[0],
        screenConfig: screenConfig,
      };

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch project details" },
      { status: 500 },
    );
  }
}
