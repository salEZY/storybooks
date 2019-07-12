const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
