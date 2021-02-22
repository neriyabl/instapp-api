import { getUsers, getUser } from "../services/users.service.js";
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send(getUsers());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    res.send(getUser(id));
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

export default router;
