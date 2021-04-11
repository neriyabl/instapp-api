import { getUsers, getUser, createUser } from "../services/users.service.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await getUsers());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.send(await getUser(id));
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { name, password, img } = req.body;

  //TODO generate hashed solted password,

  // validate
  if (!(name && password && img)) {
    req.sendStatus(400);
    return;
  }

  const user = await createUser({ name, password, img, salt: "123" });

  await user.save();

  res.status(201).send(user);
  return;
});

export default router;
