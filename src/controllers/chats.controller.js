import { getChat, getChats } from "../services/chats.service.js";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await getChats());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.send(await getChat(id));
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

export default router;
