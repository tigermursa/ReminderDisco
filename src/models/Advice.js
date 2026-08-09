// models/Advice.js
import mongoose from "mongoose";

const AdviceSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please provide advice text"],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  },
);

export default mongoose.models.Advice || mongoose.model("Advice", AdviceSchema);
