import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/router.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
