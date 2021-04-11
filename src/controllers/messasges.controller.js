import express from "express";
import { addMessageToChat } from "../services/chats.service.js";
import { addMessage } from "../services/messages.service.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { author, content, chatId } = req.body;
    const message = await addMessage({ author, content });
    await addMessageToChat(chatId, message._id);
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export default router;
