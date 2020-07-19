const passport = require("passport");
const config = require('config');

const GOOGLE_CLIENT_ID = config.get('GOOGLE_CLIENT_ID');
const GOOGLE_SECRET_ID = config.get('GOOGLE_SECRET_ID');
const GOOGLE_CALL_BACK_URL = config.get('GOOGLE_CALL_BACK_URL');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(user, done) {
 done(null, user);
});
passport.use(
 new GoogleStrategy(
  {
   clientID: GOOGLE_CLIENT_ID,
   clientSecret: GOOGLE_SECRET_ID,
   callbackURL: GOOGLE_CALL_BACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
   const user = {
    email: profile.emails[0].value,
    name: profile.displayName,
    token: accessToken
   };

   console.log(user);

   return done(null, user);
  }
 )
);