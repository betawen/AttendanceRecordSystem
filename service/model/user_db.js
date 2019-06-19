'use strict'

const dbUrl = require('../config/db_config').Urls.dbUrl;
let utils = require('../utils/utils');

let MongoClient = require('mongodb').MongoClient;
let ERROR_SET = require('../config/error_set');
let logger = require('winston').loggers.get('UserDBLogger');


class userDB {
    constructor() {
        this.index = 'user_id'
        MongoClient.connect(dbUrl + '/user', (err, db) => {
            if(err){
                throw err
            }else {
                this.db = db.db('user');
            }
        })
    }
    getUserInfoById(params, options) {
        if(undefined === params || params.user_id === undefined) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER_ID);
        }
        let user_id = params.user_id;
        if (options) {}
        let filter = {user_id: user_id};

        return this.db.collection('user').find(filter).toArray();
    }

    getUserInfo(options) {

        // let limit;
        // if (undefined !== options.limit) {
        //     limit = options.limit;
        // }

        return this.db.collection('user_mac').find().toArray();
    }

    getUserRecordById(params, options) {
        if(undefined === params || params.user_id === undefined) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER_ID);
        }
        let user_id = params.user_id;
        let limit;
        if (options.limit) {
            limit = options.limit;
        }
        let filter = {user_id: user_id};
        let user_record = this.db.collection('user_record').find(filter).limit(limit);
        if(undefined === user_record) {
            return undefined;
        }
        return {user_record}
    }

    getUserNameByMacId(params, options) {
        if(undefined === params || params.mac_id === undefined) {
            throw ERROR_SET.createResponseError(ERROR_SET.REQ_ERROR.USER_ATTEND_WITHOUT_MAC_ID);
        }
        return this.db.collection('user').find(params).toArray();
    }

    getUserRecordDefault(params, options) {
        // let date = utils.getDateNumber() - 7;
        // let filter = {date: {$gte: date}};
        let filter;
        if(undefined !== params) {
            filter = params;
        }
        let limit = 50;
        if(undefined !== options) {
            limit = options.limit;
        }
        return this.db.collection('user_record').find(filter).limit(limit).sort({update_time: -1}).toArray();
    }

    getUsersByGroupId(params, options) {
        if(undefined === params || undefined === params.group_id) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_GROUP_ID);
        }
        let group_id = params.group_id;
        let filter = {group_id: group_id};
        let user_info_list = this.db.find(filter);

        let user_record_list = [];
        for(let user of user_info_list) {
            if(undefined === user.user_id) continue;
            let user_record = this.getUserRecordById(user, options);
            if(undefined === user_record){
                continue;
            }else {
                user_record = user_record.user_record;
            }
            user_record_list.push(user_record);
        }
        return {user_record_list}
    }

    getUsersByRoomId(params, options) {
        if(undefined === params || undefined === params.room_id) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_GROUP_ID);
        }
        let room_id = params.room_id;
        let filter = {room_id: room_id};
        let user_info_list = this.db.find(filter);

        let user_record_list = [];
        for(let user of user_info_list) {
            if(undefined === user.user_id) continue;
            let user_record = this.getUserRecordById(user, options);
            if(undefined === user_record){
                continue;
            }else {
                user_record = user_record.user_record;
            }
            user_record_list.push(user_record);
        }
        return {user_record_list}
    }

    addOneUer(user) {
        if(undefined === user || user.user_id) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER);
        }
        this.db.collection('user').insertOne(user, (err, res) => {
            if(err) {
                throw err;
            }else {
                logger.info(`[USER_DB] ADD USER => ${user.user_id}`);
            }
        })
    }

    addManyUser(user_list) {
        if(undefined === user_list || undefined === user_list[0]) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER)
        }
        this.db.collection('user').insertMany(user_list, (err, res) => {
            if(err) {
                throw err
            }else {
                logger.info(`[USER_DB] ADD USERS => ${res.insertedCount}`);
            }
        })
    }

    deleteOneUserInfoByUserId(params) {
        if(undefined === params || undefined === params.user_id || params.username) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER_ID)
        }

        let whereStr = {};
        if(params.user_id){
            whereStr = {user_id: params.user_id}
        }else if (params.username){
            whereStr = {username: params.username}
        }
        this.db.collection('user', (err, obj) => {
            if(err) {
                throw err
            }else {
                logger.info(`[USER_DB] DELETE USER => ${whereStr}`);
            }
        })
    }

    deleteOneUserRecordByUserId(params) {
        if(undefined === params || undefined === params.user_id) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER_ID)
        }

        let whereStr = {user_id: params.user_id};
        this.db.collection('user_record').deleteOne(whereStr, (err, obj) => {
            if(err) {
                throw err
            }else {
                logger.info(`[USER_DB] DELETE USER => ${whereStr}`);
            }
        })
    }

    deleteManyUserInfoByGrade(params) {
        if(undefined === params || undefined === params.grade_id) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_GRADE_ID)
        }

        let whereStr = {grade_id: params.grade_id};
        this.db.collection('user').deleteMany(whereStr, (err, obj) => {
            if(err) {
                throw err
            }else {
                logger.info(`[USER_DB] DELETE USER COUNT => ${obj.result.n}`);
            }
        })
    }

    deleteManyUserRecordByGrade(params) {
        if(undefined === params || undefined === params.grade_id) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_GRADE_ID)
        }

        let whereStr = {grade_id: params.grade_id};
        this.db.collection('user_record').deleteMany(whereStr, (err, obj) => {
            if(err) {
                throw err
            }else {
                logger.info(`[USER_DB] DELETE USER COUNT => ${obj.result.n}`);
            }
        })
    }

    updateOneUserInfo(user, params) {
        if(undefined === user || undefined === user.user_id){
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER_ID)
        }
        if(undefined === params) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER)
        }
        let whereStr = {user_id: user.user_id}
        this.db.collection('user').updateOne(whereStr, {$set: params}, (err, res) => {
            if(err) {
                throw err
            }else {
                logger.info(`[USER_DB] UPDATE USER => ${JSON.stringify(res, null, 4)}`)
            }
        })
    }

    updateOneUserRecord(user, params) {
        if(undefined === user || undefined === user.user_id){
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER_ID)
        }
        if(undefined === params) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER)
        }
        let whereStr = {user_id: params.user_id}
        this.db.collection('user_record').updateOne(whereStr, {$set: params}, true, (err, res) => {
            if(err) {
                throw err
            }else {
                logger.info(`[USER_DB] UPDATE USER => ${user.user_id}`)
            }
        })
    }

    updateOneUserRecordIn(user, params) {
        if(undefined === user || undefined === user.user_id){
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER_ID)
        }
        if(undefined === params) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER)
        }
        let whereStr = {user_id: params.user_id}
        this.db.collection('user_record').updateOne(whereStr, params, true, (err, res) => {
            if(err) {
                throw err
            }else {
                logger.info(`[USER_DB] UPDATE USER => ${user.user_id}`)
            }
        })
    }
}

module.exports = userDB;
