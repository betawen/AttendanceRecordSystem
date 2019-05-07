'use strict'

exports.createResponseError = function (errorObject) {
    let err = new Error(errorObject.message);
    err.status = errorObject.status;
    err.msg = errorObject.message;
    return err;
};

module.exports.DB_ERROR = {
    NO_USER_ID:{message: 'THERE IS NO USER_ID', status: 600},
    NO_GROUP_ID: {message: 'THERE IS NO GROUP_ID', status: 601},
    NO_ROOM_ID: {message: 'THERE IS NO ROOM_ID', status: 602},
}
