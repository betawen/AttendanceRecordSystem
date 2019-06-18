"use strict";

let express = require('express');
let router = express.Router();

let userLogic = require('../logic/user_logic');

let ERROR_SET = require('../config/error_set');

/* GET users listing. */
router.post('/user/attend', function(req, res, next) {

    if(undefined === req.params.mac_id) {
        throw ERROR_SET.createResponseError(ERROR_SET.REQ_ERROR.USER_ATTEND_WITHOUT_MAC_ID)
    }

    let params = {
        mac_id: req.params.mac_id,
    }

    params.msg = req.params.msg | 0;
    userLogic.userAttendLogic(params);
});

module.exports = router;
