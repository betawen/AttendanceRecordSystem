let userDB = new (require('../model/user_db'))();

exports.getUserInfo = async function () {

    console.log('getting user info')
    let res_list = await userDB.getUserInfo();
    // console.log(res_list)
    return {res_list}

}

