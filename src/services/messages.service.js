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

export const addMessage = ({ author, content }) => {
  const id = Object.keys(messages).length + 1;
  const timestemp = Date.now();
  const message = {
    id,
    author,
    content,
    timestemp,
  };
  messages[message.id] = message;
  return message;
};
