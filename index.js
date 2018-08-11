const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, params => {
  console.log("Server listening on port " + PORT);
});
