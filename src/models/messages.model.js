import { Schema } from "mongoose";

export const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  timestemp: { type: Date, default: Date.now },
  content: String,
});
