import { users } from "../../data/users.js";
import { getChatDTO } from "./chats.service.js";
export const getUserDTO = (id) => ({ id: users[id].id, name: users[id].name });

export const getUsers = () => {
  return { ...users };
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
