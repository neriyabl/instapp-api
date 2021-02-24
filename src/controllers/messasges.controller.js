import express from "express";
import { addMessageToChat } from "../services/chats.service";
import { addMessage } from "../services/messages.service";
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { author, content, chatId } = req.body;
    const message = addMessage({ author, content });
    addMessageToChat(chatId, message.id);
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export default router;
