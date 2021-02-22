import { getChat, getChats } from "../services/chats.service.js";
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send(getChats());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    res.send(getChat(id));
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

export default router;
