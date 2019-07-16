require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

require("./config/passport")(passport);
const auth = require("./routes/auth");

const app = express();

app.use("/auth", auth);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome to story books");
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
