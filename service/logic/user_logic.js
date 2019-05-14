'use strict'

let userDB = new (require('../model/user_db'))();

let logger = require('winston').loggers.get('HomeLogic');

exports.getDefaultUserRecordLogic = async function (params, options) {
    let record_list = await userDB.getUserRecordDefault();

    // console.log(record_list)

    return {record_list};

}




// let obj = new Object();
// console.log(obj)
// console.log(obj.__proto__ === Object.prototype)
// console.log(JSON.stringify(Object.prototype.constructor, null, 4))
// console.log(Object.prototype)
