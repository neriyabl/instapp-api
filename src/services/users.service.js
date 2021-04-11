import { users } from "../../data/users.js";
import { getChatDTO } from "./chats.service.js";
import { model } from "mongoose";
import { UserDtoFields, UserSchema } from "../models/users.model";

const User = model("User", UserSchema);

export const getUsers = async () => {
  return await User.find();
};

export const getUser = async (id) => {
  const user = await User.findById(id).populate({
    path: "chats",
    populate: {
      path: "members",
      model: "User",
      select: UserDtoFields,
    },
  });
  return user;
};

export const getUserDTO = async (id) => {
  return await User.findById(id, UserDtoFields);
};

export const getUserByUserName = async (userName) => {
  return await User.findOne({ name: userName });
};

export const createUser = async (userDto) => {
  const user = new User(userDto);
  await user.save();
  return user;
};
