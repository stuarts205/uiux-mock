import { db } from "@/config/db";
import { ProjectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async  function POST(request: NextRequest) {
    const {userInput, device, projectId } = await request.json();
    const user = await currentUser();  

    const [result] = await db
        .insert(ProjectTable)
        .values({
            projectId: projectId,
            userInput: userInput,
            device: device,
            userId: user?.primaryEmailAddress?.emailAddress as string
        }).returning();

    return NextResponse.json(result);
}


