// app/api/advice/[id]/route.js
import { NextResponse } from "next/server";
import { updateAdvice, deleteAdvice } from "@/lib/advice";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { text } = await request.json();
    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const updated = await updateAdvice(id, text.trim());
    if (!updated) {
      return NextResponse.json({ error: "Advice not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = await deleteAdvice(id);
    if (!deleted) {
      return NextResponse.json({ error: "Advice not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
