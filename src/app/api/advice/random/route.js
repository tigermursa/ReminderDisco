// app/api/advice/random/route.js
import { NextResponse } from "next/server";
import { getRandomAdvice } from "@/lib/advice";

export async function GET() {
  try {
    const advice = await getRandomAdvice();
    return NextResponse.json({ advice });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
