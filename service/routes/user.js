"use strict";

let express = require('express');
let router = express.Router();

let userLogic = require('../logic/user_logic')

/* GET users listing. */
router.post('/user/login:userid', function(req, res, next) {
  let params = {
    userID: req.params.userID,
    passwd: req.body.passwd
  }

  userLogic.userLogic;

});

module.exports = router;
