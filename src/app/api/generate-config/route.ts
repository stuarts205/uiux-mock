import { db } from "@/config/db";
import { openrouter } from "@/config/openroute";
import { ProjectTable, ScreenConfigTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/data/prompt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userInput, deviceType, projectId } = await req.json();

  const aiResult = await openrouter.chat.send({
    model: "nvidia/nemotron-3-nano-30b-a3b:free",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: APP_LAYOUT_CONFIG_PROMPT.replace("{deviceType}", deviceType),
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

  const jsonAiResult = JSON.parse(
    aiResult.choices?.[0]?.message?.content as string,
  );

  if (jsonAiResult) {
    await db.update(ProjectTable).set({
      projectVisualDescription: jsonAiResult?.projectVisualDescription,
      projectName: jsonAiResult?.projectName,
      theme: jsonAiResult?.theme,
    })
    .where(eq(ProjectTable.projectId, projectId as string));

    jsonAiResult.screens?.forEach(async (screen: any) => {
      const result = await db.insert(ScreenConfigTable).values({
        projectId: projectId,
        purpose: screen?.purpose,
        screenDescription: screen?.layoutDescription,
        screenId: screen?.id,
        screenName: screen?.name,
      });
    });

    return NextResponse.json(jsonAiResult);
  } else {
    return NextResponse.json({ msg: "Internal Server Error" });
  }
}
