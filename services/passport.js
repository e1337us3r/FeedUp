const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

//Get user model from mongoose
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      //This function is called after OAuth process is complete

      //Look up in databese and see if user exists

      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log("Existing user, logging in.");
          done(null, existingUser);
        } else {
          console.log("User unrecognised, creating new account.");

          new User({ googleID: profile.id })
            .save()
            .then(newUser => done(null, newUser));
        }
      });
    }
  )
);

console.log("Passport settings configured.");
