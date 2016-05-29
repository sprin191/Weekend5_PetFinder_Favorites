var express = require('express');
var router = express.Router();
var Favorite = require('../models/favorite');

router.post('/', function (req, res) {
  var favorite = new Favorite(req.body);
  favorite.save(function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(201);
  });
});

module.exports = router;
