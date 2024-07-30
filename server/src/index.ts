import express from "express";

const app = express();

const PORT = 8989;

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
