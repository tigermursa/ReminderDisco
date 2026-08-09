// app/api/send-note/route.js
import { NextResponse } from "next/server";
import { getRandomAdvice } from "@/lib/advice";

export async function GET() {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "DISCORD_WEBHOOK_URL not set" },
        { status: 400 },
      );
    }

    const advice = await getRandomAdvice(); // now async

    const message = {
      content: `\n${advice}`,
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Discord error: ${response.status}`);
    }

    return NextResponse.json({ success: true, advice });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
