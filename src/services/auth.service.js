import { createHmac, randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { getUserByUserName } from "./users.service";

export const SECRET = "1f28dba927bcd0afe82tdkvgpshwjbam";

const generateSalt = () => {
  return randomBytes(6).toString("hex").slice(0, 12);
};

const hasher = (password, salt) => {
  const hash = createHmac("sha512", salt);
  hash.update(password);
  const value = hash.digest("hex");
  return {
    salt: salt,
    hashedpassword: value,
  };
};

const compare = (user, password) => {
  const { hashedpassword } = hasher(password, user.salt);
  return hashedpassword === user.password;
};

const generateJwt = ({ _id, name, img }) => {
  const payload = { _id, name, img };
  return jwt.sign(payload, SECRET);
};

export const login = async (username, password) => {
  const user = await getUserByUserName(username);
  if (user && compare(user, password)) {
    return generateJwt(user);
  }
};

export const register = (password) => {
  const salt = generateSalt();
  return hasher(password, salt);
};
