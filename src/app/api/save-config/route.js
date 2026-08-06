import { NextResponse } from "next/server";
import { writeNote } from "@/lib/storage";

export async function POST(request) {
  try {
    const { note } = await request.json();
    if (note === undefined) {
      return NextResponse.json({ error: "note required" }, { status: 400 });
    }
    await writeNote(note || "");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
