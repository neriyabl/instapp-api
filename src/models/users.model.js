import { Schema } from "mongoose";

export const UserSchema = new Schema({
  name: String,
  salt: String,
  password: String,
  img: String,
  chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
});

export const UserDtoFields = { _id: 1, img: 1, name: 1 };
