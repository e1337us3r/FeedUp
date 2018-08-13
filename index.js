console.log("Initializing server...");

const keys = process.env.prod ? {} : require("../config/keys");
const mongoose = require("mongoose");
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const app = express();

//Setup cookie functionality to work in express
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey || keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
