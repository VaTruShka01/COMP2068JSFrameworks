var express = require('express');
var router = express.Router();
var User = require("../models/user");
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/Login', function(req, res, next) {

  let messages = req.session.messages || [];

  req.session.messages;

  res.render('login', {title: "Login", messages: messages});
  
});


router.post("/Login", passport.authenticate("local", {
  successRedirect: "/trackers",
  failureRedirect: "/Login",
  failureMessage: "Invalid Credentials"
}))

router.get('/Register', function(req, res, next) {
  res.render('register', {title: "Register"});
});

router.post('/register', (req, res, next) => {

  const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age
  });

  User.register(newUser, req.body.password, (err, user) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }

      req.login(user, (err) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.redirect("/trackers");
      });
  });
});

module.exports = router;
