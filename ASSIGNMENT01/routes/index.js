var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/about', (req, res, next) => {
  res.render('about', {title: "About"});
});

router.get('/projects', (req, res, next) => {
  res.render('projects', {title: 'My Projects'});
});

router.get('/contact', (req, res, next) => {
  res.render("contact", {title: "Contact Me"});
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vlad Berest', layout: false});
});

module.exports = router;
