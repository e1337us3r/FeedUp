const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = process.env.prod ? {} : require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID || keys.googleClientID,
      clientSecret: process.env.clientSecret || keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      //This function is called after OAuth process is complete
      new User({ googleID: profile.id }).save();
    }
  )
);

console.log("Passport settings configured.");
