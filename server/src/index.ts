import express from "express";
import "dotenv/config";
import "./db/index";

import authRouter from "./routers/auth";

const app = express();

//register midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/public"));

app.use("/auth", authRouter);

const PORT = process.env.SERVER_PORT || 8989;

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
