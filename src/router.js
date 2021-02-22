import express from "express";
import usersController from "./controllers/users.controller.js";
import chatsController from "./controllers/chats.controller.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});

router.use("/users", usersController);
router.use("/chats", chatsController);

export default router;
