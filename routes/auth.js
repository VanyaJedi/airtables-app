const cookieSession = require('cookie-session')
const passport = require('passport');
require('./passport-setup');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})


app.use(cookieSession({
  name: 'airtable-app-session',
  keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401);
  }
}


app.use(passport.initialize());
app.use(passport.session());

app.get('/failure', (req, res) => {
  res.send('failed');
})

app.get('/auth/google',
  passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: 'http://localhost:3000/',
        failureRedirect: '/failure'
}));
