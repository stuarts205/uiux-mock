import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { ScreenConfigTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { openrouter } from "@/config/openroute";
import { GENERATE_SCREEN_PROMPT } from "@/data/prompt";

export async function POST(request: NextRequest) {
  const {
    projectId,
    screenId,
    screenName,
    purpose,
    screenDecsription,
    projectVisualDescription,
  } = await request.json();

  const userInput = `
    screen name is: ${screenName},
    screen purpose: ${purpose},
    screen description: ${screenDecsription},
  `;

  try {
    const aiResult = await openrouter.chat.send({
      model: "nvidia/nemotron-3-nano-30b-a3b:free",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: GENERATE_SCREEN_PROMPT,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userInput,
            },
          ],
        },
      ],
      stream: false,
    });

    const code = aiResult.choices[0]?.message?.content;

    const [updateResult] = await db
      .update(ScreenConfigTable)
      .set({
        code: code as string,
      })
      .where(
        and(
          eq(ScreenConfigTable.projectId, projectId as string),
          eq(ScreenConfigTable.screenId, screenId as string),
        ),
      ).returning();

    return NextResponse.json(updateResult);
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" });
  }
}
