'use strict'

let userDB = new (require('../model/user_db'))();
let md5 = require('md5')
let logger = require('winston').loggers.get('HomeLogic');
let ERROR_SET = require('../config/error_set')

const INVITE_CODE = md5('SeedClass2016');

exports.getDefaultUserRecordLogic = async function (params, options) {
    let record_list = await userDB.getUserRecordDefault();

    // console.log(record_list)

    return {record_list};

}

exports.userLoginLogic = async function (params, options) {
    let user = await  userDB.getUserInfoById(params)
    if(user[0].is_manager && md5(params.passwd) === user[0].passwd) {
        return true
    }
    return false;
}

exports.userRegisterLogic = async function (params, option) {

    if(INVITE_CODE === md5(params.invite_code)){
        let updateStr = {
            is_manager: true,
            passwd: md5(params.passwd)
        }
        await userDB.updateOneUserInfo({user_id: params.user_id}, updateStr);
        let res = await userDB.getUserInfoById({user_id: params.user_id});
        if(undefined === res[0]){
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER);
        }
        return res[0].is_manager;
    }
    throw ERROR_SET.createResponseError(ERROR_SET.LOGIC_ERROR.WRONG_INVITE_CODE)

}


// let obj = new Object();
// console.log(obj)
// console.log(obj.__proto__ === Object.prototype)
// console.log(JSON.stringify(Object.prototype.constructor, null, 4))
// console.log(Object.prototype)
