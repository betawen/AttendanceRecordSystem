let dataLogic;

let MongoClient = require('mongodb').MongoClient;
const dbUrl = require('../config/db_config').Urls.dbUrl;

MongoClient.connect(dbUrl + '/user', (err, db) => {
    if(err){
        throw err
    }else {
        let mydb = db.db('user');
    }
})
function getUserNameByMacId(params, options) {
    if(undefined === params || params.mac_id === undefined) {
        throw ERROR_SET.createResponseError(ERROR_SET.REQ_ERROR.USER_ATTEND_WITHOUT_MAC_ID);
    }
    console.log(params);
    return mydb.collection('user').find(params).toArray();
}

(async () => {
    let res = await getUserNameByMacId({mac_id: "1c:91:48:44:45:9b"})
    console.log(res)
})();

