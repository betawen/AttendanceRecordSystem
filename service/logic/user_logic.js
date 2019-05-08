'use strict'

let userDB = new (require('../model/user_db'))();

let logger = require('winston').loggers.get('HomeLogic');

exports.getDefaultUserRecordLogic = async function (params, options) {
    let user_record_list = await userDB.getUserRecordDefault();

    let record_list = user_record_list.user

}
