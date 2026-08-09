// lib/advice.js
import { connectToDatabase } from "@/lib/mongodb";
import Advice from "@/models/Advice";

// Get a random advice from the database
export async function getRandomAdvice() {
  await connectToDatabase();
  const count = await Advice.countDocuments();
  if (count === 0) {
    // Seed some default advice if collection is empty
    await seedDefaultAdvice();
    return getRandomAdvice(); // retry after seeding
  }
  const random = Math.floor(Math.random() * count);
  const advice = await Advice.findOne().skip(random);
  return advice.text;
}

// Seed default advice (optional, run once)
async function seedDefaultAdvice() {
  const defaultList = [
    "সবরের সাথে কাজ করো, আল্লাহ সফলতা দেবেন।",
    "যে ব্যক্তি আল্লাহর ওপর ভরসা করে, আল্লাহ তার জন্য যথেষ্ট।",
    // ... add all your original advice here
  ];
  await Advice.insertMany(defaultList.map((text) => ({ text })));
}

// CRUD functions
export async function getAllAdvice() {
  await connectToDatabase();
  return Advice.find().sort({ createdAt: -1 });
}

export async function createAdvice(text) {
  await connectToDatabase();
  const advice = new Advice({ text });
  return advice.save();
}

export async function updateAdvice(id, text) {
  await connectToDatabase();
  return Advice.findByIdAndUpdate(
    id,
    { text },
    { new: true, runValidators: true },
  );
}

export async function deleteAdvice(id) {
  await connectToDatabase();
  return Advice.findByIdAndDelete(id);
}
