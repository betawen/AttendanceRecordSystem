'use strict'

let userDB = new (require('../model/user_db'))();
let userRecordDB = new (require("../model/user_record_db"))();
let md5 = require('md5')
let logger = require('winston').loggers.get('UserLogic');
let ERROR_SET = require('../config/error_set')

const INVITE_CODE = md5('SeedClass2016');

exports.getDefaultUserRecordLogic = async function () {
    let record_list = await userDB.getUserRecordDefault();

    // console.log(record_list)

    let res_list = [];

    for (let record of record_list) {

        if(undefined === record.mac_id)
            continue;

        let param = {mac_id: record.mac_id}

        let user = await userDB.getUserNameByMacId(param);
        let res = record;
        if (undefined === user[0] || undefined === user[0].user_name){
            res['user_name'] = 'unknown';
        }else {
            res['user_name'] = user[0].user_name;
        }

        res_list.push(res)
    }
    // console.log(record_list)

    return {res_list};

}

exports.userLoginLogic = async function (params, options) {
    let user = await  userDB.getUserInfoById(params)
    // if(md5(params.passwd) === user[0].passwd) {
    if(user[0].is_manager && md5(params.passwd) === user[0].passwd) {
            return true
        // }
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


exports.userAttendLogic = async function (params, option) {

    if(undefined === params.mac_id) {
        throw ERROR_SET.createResponseError(ERROR_SET.REQ_ERROR.USER_ATTEND_WITHOUT_MAC_ID);
    }

    if(params.msg === 1) {
        let time = new Date().getTime();
        let updateObj = {};
        let user_list = await userRecordDB.getUserRecordByMacId({mac_id: params.mac_id.toLocaleLowerCase()});
        if(undefined === user_list[0]){
            return {msg:'user did not come', status: 200}
        }
        let options = {
            update_time: user_list[0].update_time
        };
        updateObj['mac_id'] = params.mac_id.toLocaleLowerCase();
        updateObj['leave_time'] = time;
        updateObj['update_time'] = time;
        userRecordDB.updateOneUserRecordOut(updateObj, options);
        return {status:200, msg: 'user record update'}
    } else {
        let time = new Date().getTime();
        let param = {mac_id: params.mac_id.toLocaleLowerCase()};
        let user = await userDB.getUserNameByMacId(param);
        if(undefined === user){
            return {status:200, msg:'user not exist'};
        }
        let newObj = {};
        newObj['mac_id'] = params.mac_id.toLocaleLowerCase();
        newObj['arrive_time'] = time;
        newObj['update_time'] = time;
        userRecordDB.insertOneUserRecord(newObj);
        return {status:200, msg: 'user record add'}
    }
}

exports.getUserName = async function (params) {

    if(undefined === params.mac_id) {
        throw ERROR_SET.createResponseError(ERROR_SET.REQ_ERROR.USER_ATTEND_WITHOUT_MAC_ID)
    }

    let userInfo = await userDB.getUserNameByMacId(params);

    if(undefined === userInfo) {
        return undefined;
    }

    return userInfo;

}


// let obj = new Object();
// console.log(obj)
// console.log(obj.__proto__ === Object.prototype)
// console.log(JSON.stringify(Object.prototype.constructor, null, 4))
// console.log(Object.prototype)
