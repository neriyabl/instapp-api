import jwt from "jsonwebtoken";
import { SECRET } from "../services/auth.service";

const verify = (token) => {
  return jwt.verify(token, SECRET);
};

export const auth = () => (req, res, next) => {
  const {
    cookies: { token },
  } = req;
  if (token && verify(token)) {
    next();
  } else {
    res.sendStatus(403);
  }
};
