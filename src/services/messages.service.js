import { model } from "mongoose";
import { messages } from "../../data/messages.js";
import { MessageSchema } from "../models/messages.model";
import { UserDtoFields } from "../models/users.model.js";

const Message = model("Message", MessageSchema);

export const getMessages = async () => {
  return await Message.find();
};

export const getMessage = async (id) => {
  const message = await Message.findById(id);
  if (!message) {
    throw `Message with id ${id} doesn't exist`;
  }
  message.populate({
    path: "author",
    select: UserDtoFields,
  });
  return message;
};

export const addMessage = async ({ author, content, chat }) => {
  const timestemp = Date.now();
  const message = new Message({
    author,
    content,
    timestemp,
  });
  await message.save();
  return message;
};
