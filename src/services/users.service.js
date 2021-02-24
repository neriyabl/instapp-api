import { users } from "../../data/users.js";
import { getChatDTO } from "./chats.service.js";

export const getUsers = () => {
  return { ...users };
};

export const getUserDTO = (uid) => {
  const users = getUsers();
  const { id, img, name } = users[uid];
  return { id, img, name };
};

export const getUser = (id) => {
  const users = getUsers();
  if (!Object.keys(users).includes(id)) {
    throw `User with id ${id} doesn't exist`;
  }
  const user = { ...users[id] };
  user.chats = user.chats.map(getChatDTO);
  return user;
};
