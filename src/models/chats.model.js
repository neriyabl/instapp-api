import { Schema } from "mongoose";

export const ChatSchema = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});
