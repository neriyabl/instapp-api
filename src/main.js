import express from "express";
import cors from "cors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import router from "./router.js";

import { connect } from "mongoose";
import { auth } from "./middlewares/auth.js";
import authController from "./controllers/auth.controller";

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(json());

app.use(authController);

app.use(auth());

app.use(router);

connect("mongodb://localhost/instapp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    })
  )
  .catch((err) => {
    console.error(err);
  });
