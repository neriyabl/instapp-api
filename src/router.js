import express from "express";
import usersController from "./controllers/users.controller";
import chatsController from "./controllers/chats.controller";
import messagesController from "./controllers/messasges.controller";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});

router.use("/users", usersController);
router.use("/chats", chatsController);
router.use("/messages", messagesController);

export default router;
