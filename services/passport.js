const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = process.env.prod ? {} : require("../config/keys");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID || keys.googleClientID,
      clientSecret: process.env.clientSecret || keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token: ", accessToken);
      console.log("refresh token: ", refreshToken);
      console.log("profile: ", profile);
    }
  )
);

console.log("Passport settings configured.");
