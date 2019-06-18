
let express = require('express');
let router = express.Router();
let logger = require('winston').loggers.get('UserRouter');
let ERROR_SET = require('../config/error_set');

let UserLogic = require('../logic/user_logic');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', (req, res) => {
  res.send('Hello, world!')
})

router.get('/home/record', (req, res) => {
  let params = req.params;
  UserLogic.getDefaultUserRecordLogic(params)
      .then(res_list => {
        // console.log('/home/record', record_list)
        res.json(res_list)
      })
      .catch(err => {
          console.log('error'+err);
        logger.error(err)
      })
})

// router.post('/user/get_user_name', (req, res) => {
//
//     if(undefined === req.body.mac_id) {
//         throw ERROR_SET.createResponseError(ERROR_SET.REQ_ERROR.USER_ATTEND_WITHOUT_MAC_ID)
//     }
//
//     let params = {
//         mac_id: req.body.mac_id
//     }
//
//     UserLogic.getUserName(params)
//         .then(user => {
//             if(user) {
//                 res.json(user)
//             }else {
//                 res.json(undefined)
//             }
//         })
//         .catch(err => {
//             logger.error(err)
//             throw err;
//         })
//
// })

router.post('/user/login', (req, res) => {
  console.log(JSON.stringify(req.body, null, 4))
  let params = {
    user_id: req.body.user_id,
    passwd: req.body.passwd
  }
  UserLogic.userLoginLogic(params)
      .then(user => {
        if(user){
          res.json({status: 200, msg: 'ok'})
        }
        else{
          res.json({status: 401, msg: 'forbidden'})
        }
      })
      .catch(err => {
          logger.error(err)
          throw err
      })
})

router.post('/user/register', (req, res) => {
    console.log(JSON.stringify(req.body, null, 4))
    let params = {
        user_id: req.body.user_id,
        passwd: req.body.passwd,
        invite_code: req.body.invite_code
    }

    UserLogic.userRegisterLogic(params)
        .then(result => {
            if(result) {
                res.json({status: 200, msg: 'ok'})
            }
        })
        .catch(err => {
            logger.error(err)
            throw err
        })
})

router.post('/user/attend', function(req, res, next) {

    if(undefined === req.body.mac_id) {
        throw ERROR_SET.createResponseError(ERROR_SET.REQ_ERROR.USER_ATTEND_WITHOUT_MAC_ID)
    }

    let params = {
        mac_id: req.body.mac_id,
    }

    params.msg = req.body.msg | 0;
    UserLogic.userAttendLogic(params)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            logger.error(err)
            throw err
        })
});

module.exports = router;
