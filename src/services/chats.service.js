import { chats } from "../../data/chats.js";
import { getUserDTO } from "./users.service.js";
import { getMessages, getMessage } from "./messages.service.js";
import { messages } from "../../data/messages.js";

export const getChatDTO = (id) => {
  const { messages: cMessages, ...chat } = { ...chats[id] };
  chat.members = chat.members.map(getUserDTO);
  chat.lastMessage = getMessages()[cMessages[cMessages.length - 1]];
  return chat;
};

export const getChats = () => {
  return { ...chats };
};

export const getChat = (id) => {
  const chats = getChats();
  if (!Object.keys(chats).includes(id)) {
    throw `Chat with id ${id} doesn't exist`;
  }
  const chat = { ...chats[id] };
  chat.members = chat.members.map(getUserDTO);
  chat.messages = chat.messages.map((id) => {
    const message = getMessage(`${id}`);
    message.author = getUserDTO(message.author);
    return message;
  });
  return chat;
};

export const addMessageToChat = (chatId, messageId) => {
  if (!Object.keys(chats).includes(`${chatId}`)) {
    throw `Chat with id ${chatId} doesn't exist`;
  }
  if (!Object.keys(getMessages()).includes(`${messageId}`)) {
    throw `Message with id ${messageId} doesn't exist`;
  }
  chats[chatId].messages.push(messageId);
};
