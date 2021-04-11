import { login, register } from "../services/auth.service";
import express from "express";
import { createUser, getUserByUserName } from "../services/users.service";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.sendStatus(400);
    return;
  }
  let token = await login(username, password);
  if (!token) {
    res.sendStatus(401);
    return;
  }
  res.cookie("token", token);
  res.sendStatus(200);
});

router.post("/register", async (req, res) => {
  const { username, password, img } = req.body;
  if (!(username && password)) {
    res.sendStatus(400);
    return;
  }
  if (await getUserByUserName(username)) {
    res.sendStatus(400);
    return;
  }
  const { salt, hashedpassword } = register(password);
  const user = await createUser({
    name: username,
    img: img || "",
    password: hashedpassword,
    salt,
  });
  res.status(201).send(user);
});

export default router;
