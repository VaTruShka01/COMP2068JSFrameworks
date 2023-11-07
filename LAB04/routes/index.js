var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/me', function(req, res, next) {
  res.render('me');
});
router.get('/father', function(req, res, next) {
  res.render('father');
});
router.get('/mother', function(req, res, next) {
  res.render('mother');
});
router.get('/sister', function(req, res, next) {
  res.render('sister');
});

module.exports = router;
