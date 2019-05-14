let express = require('express');
let router = express.Router();
let logger = require('winston').loggers.get('UserRouter');

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
      .then(record_list => {
        // console.log('/home/record', record_list)
        res.json(record_list.record_list)
      })
      .catch(err => {
        logger.error(err)
      })
})

module.exports = router;
