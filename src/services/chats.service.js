import { chats } from "../../data/chats.js";
import { getUserDTO } from "./users.service.js";
import { getMessages, getMessage } from "./messages.service.js";
import { model } from "mongoose";
import { ChatSchema } from "../models/chats.model";
import { UserDtoFields } from "../models/users.model.js";

const Chat = model("Chat", ChatSchema);

export const getChatDTO = async (id) => {
  const { messages: cMessages, ...chat } = getChat(id);
  chat.members = await Promise.all(chat.members.map(getUserDTO));
  chat.lastMessage = await getMessage(cMessages[cMessages.length - 1]);
  return chat;
};

export const getChats = async () => {
  return await Chat.find();
};

export const getChat = async (id) => {
  const chat = await Chat.findById(id)
    .populate({
      path: "members",
      select: UserDtoFields,
    })
    .populate("messages");
  if (!chat) {
    throw `Chat with id ${id} doesn't exist`;
  }

  return chat;
};

export const addMessageToChat = async (chatId, messageId) => {
  return await Chat.findByIdAndUpdate(chatId, {
    $push: { messages: messageId },
  });
};
