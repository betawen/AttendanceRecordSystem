let md5 = require('md5')
let users = [
  {
    "user_id": "betaGo",
    "username": "ljw",
    "group_id": "pinssible",
    "room_id": null,
    "student_id": "U200000000",
    "is_manager": true,
    "passwd": md5("123456"),
    mac_id: 'test_user1'
  },
  {
    "user_id": "ljshh",
    "username": "shh",
    "group_id": "ai",
    "room_id": null,
    "student_id": "U200000000",
    mac_id: 'test_user2'
  },
  {
    "user_id": "yxzqj",
    "username": "zqj",
    "group_id": "yy",
    "room_id": null,
    "student_id": "U200000000",
    mac_id: 'test_user3'
  },
  {
    "user_id": "yxzx",
    "username": "zx",
    "group_id": "intel",
    "room_id": null,
    "student_id": "U200000000",
    mac_id: 'test_user4'
  },
  {
    "user_id": "ljlzl",
    "username": "lzl",
    "group_id": "qkl",
    "room_id": null,
    "student_id": "U200000000",
    mac_id: 'test_user5'
  },
];

exports.users = users;
