let userDB = new (require('../model/user_db'))();

exports.getUserInfo = async function () {

    let res_list = await userDB.getUserInfo();

    return {res_list}

}

