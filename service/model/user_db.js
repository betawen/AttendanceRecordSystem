'use strict'

const dbUrl = require('../config/db_config').Urls.dbUrl;


let MongoClient = require('mongodb').MongoClient;
let ERROR_SET = require('../config/error_set')


class userDB {
    constructor() {
        this.index = 'user_id'
        MongoClient.connect(dbUrl + 'user', (err, db) => {
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
        let user_info = this.db.collection('user').find(filter);
        if(undefined === user_info) {
            return undefined;
        }
        return {user_info}
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
}
