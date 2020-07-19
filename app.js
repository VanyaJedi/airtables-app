const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const cookieSession = require("cookie-session");
const config = require('config');

const ENV = config.get('ENV');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

app.use(express.static("client/build"));

require("./passport-setup");

app.use(cookieSession({
  name: 'airtable-app-session',
  keys: ['key1', 'key2']
}));


app.use(passport.initialize());
app.use(passport.session());


app.get('/failed', (req, res) => res.send('login failure'));
app.get('/auth/google', passport.authenticate('google', { scope: ["profile", "email"] }));

app.get('/auth/google/callback',  passport.authenticate("google", { failureRedirect: "/failed" }),
  function(req, res) {
    console.log(app.get('env'));
    if (req.user.email === 'vanya71310@gmail.com' || req.user.email === 'roman.avetisov@latoken.com' || req.user.email === 'andrey.khomutov@latoken.com' ) {
      req.user.role='admin';
      res.redirect('/');
      req.session.valid = true;
    } else {
      req.logout();
      res.sendStatus(401);
    }
  }
);

app.get('/checkUser', (req, res) => {
  if(ENV === 'dev') {
    res.send(
      {
        email: 'vanya71310@gmail.com',
        name: 'Ivan',
        token: 'ya29.a0AfH6SMDQUV67LyZCVnOc4blOWJN3D-PPPa631nasv_w5RpRr_H6pheQFHOVqWOKekwSqSaUcr2cLypAqDvH-pcKdAuv1sCdI6iz-_Gx4yPA_wW6x3pBQOKwqnwTdS5Pq48JhSImJfXZqwy3bYF1WuDki-hTjgk7LwGA',
        role: 'admin'
      }
    )
  } else {
    if (req.user) {
      res.send(req.user)
    } else {
      res.sendStatus(401);
    }
  }
})

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});


app.use('/airtables/', require('./routes/airtable'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});






app.listen(3001, () => console.log(`App has been started...`));
module.exports = app;
