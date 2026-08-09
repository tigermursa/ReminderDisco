// app/api/advice/route.js
import { NextResponse } from "next/server";
import { getAllAdvice, createAdvice } from "@/lib/advice";

export async function GET() {
  try {
    const advices = await getAllAdvice();
    return NextResponse.json(advices);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { text } = await request.json();
    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const newAdvice = await createAdvice(text.trim());
    return NextResponse.json(newAdvice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
