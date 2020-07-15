
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    //User.findById(id, function(err, user) {
      done(null, user);
    //});
  });

passport.use(new GoogleStrategy({
    clientID:     '481216052270-ntk12vbd8tjs2qleav1v7og75uotplos.apps.googleusercontent.com',
    clientSecret: 'kY2YeRhJmxbNu-CesmC-3bW4',
    callbackURL: "http://localhost:3000/",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });*/
  }
));