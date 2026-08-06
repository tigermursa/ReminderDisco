// app/api/send-time/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // বর্তমান সময় (বাংলাদেশ সময় বা ইউটিসি, আপনার পছন্দ)
    const now = new Date();
    const timeString = now.toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" });

    // Discord webhook-এ পাঠানোর বার্তা
    const message = {
      content: `⏰ বর্তমান সময়: ${"Hello Dear tomar ki mone ache kichu"}`,
    };

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error("DISCORD_WEBHOOK_URL সেট করা নেই");
    }

    // Discord-এ POST request
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Discord error: ${response.status}`);
    }

    return NextResponse.json({ success: true, time: timeString });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
