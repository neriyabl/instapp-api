import { messages } from "../../data/messages.js";

export const getMessages = () => {
  return { ...messages };
};

export const getMessage = (id) => {
  const messages = getMessages();
  if (!Object.keys(messages).includes(id)) {
    throw `Message with id ${id} doesn't exist`;
  }
  const message = { ...messages[id] };
  return message;
};
