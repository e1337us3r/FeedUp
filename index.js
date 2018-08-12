console.log("Initializing server...");

const keys = require("./config/keys");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.connect(
  process.env.mongoURI || keys.mongoURI,
  { useNewUrlParser: true }
);
console.log("MongoDB connected.");

//Load User model
require("./models/User");

//Configure passport settings
require("./services/passport");

//Setup auth related routes
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, params => {
  console.log("Server initialization complete.");

  console.log("Server listening on port " + PORT + ".");
});
