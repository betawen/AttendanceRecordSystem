'use strict'

const dbUrl = require('../config/db_config').Urls.dbUrl;
let utils = require('../utils/utils');

let MongoClient = require('mongodb').MongoClient;
let ERROR_SET = require('../config/error_set');
let logger = require('winston').loggers.get('UserDBLogger');


class userRecordDB {
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

    getUserRecordByMacId(params, options) {
        if(undefined === params || params.mac_id === undefined) {
            throw ERROR_SET.createResponseError(ERROR_SET.DB_ERROR.NO_USER_ID);
        }

        let user_record = this.db.collection('user_record').find(params).limit(50);
        if(undefined === user_record) {
            return undefined;
        }
        return this.db.collection('user_record').find(params).limit(50).sort({update_time: -1}).toArray();
    }

    getUserRecordDefault(params, options) {
        let date = utils.getDateNumber() - 7;
        // let filter = {date: {$gte: date}};
        let filter;
        if(undefined !== params) {
            filter = params;
        }
        let limit = 50;
        if(undefined !== options) {
            limit = options.limit;
        }
        return this.db.collection('user_record').find(filter).limit(limit).sort({updateTime: -1}).toArray();
    }

    insertOneUserRecord(params) {
        if (undefined === params.mac_id) {
            throw ERROR_SET.createResponseError(ERROR_SET.REQ_ERROR.USER_ATTEND_WITHOUT_MAC_ID);
        }


        this.db.collection('user_record').insertOne(params, (err, res) => {
            if(err) {
                throw err;
            }else {
                logger.info(`[USER_DB_RECORD] ADD USER RECORD => ${params.mac_id}`);
                return;
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

    updateOneUserRecordOut(params, options) {
        if(undefined === params || undefined === options.update_time){
            throw ERROR_SET.createResponseError(ERROR_SET.REQ_ERROR.USER_ATTEND_WITHOUT_MAC_ID)
        }
        let whereStr = options;
        this.db.collection('user_record').updateOne(whereStr, {$set: params}, true, (err, res) => {
            if(err) {
                throw err
            }else {
                logger.info(`[USER_DB] UPDATE USER => ${params.update_time}`)
                return res;
            }
        })
    }
}

module.exports = userRecordDB;
