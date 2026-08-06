import fs from "fs/promises";
import path from "path";

const DATA_FILE =
  process.env.NODE_ENV === "production"
    ? "/tmp/note.json"
    : path.join(process.cwd(), "note.json");

export async function readNote() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const json = JSON.parse(data);
    return json.note || "";
  } catch (error) {
    if (error.code === "ENOENT") {
      return "";
    }
    throw error;
  }
}

export async function writeNote(note) {
  await fs.writeFile(DATA_FILE, JSON.stringify({ note }), "utf-8");
}
