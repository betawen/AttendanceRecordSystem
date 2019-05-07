'use strict'

let MongoClient = require('mongodb').MongoClient;

// let DBName = ['user', 'user_test'];
// let tables = {
//     user: ['user', 'user_record']
// }

// import users from '../config/user_message'

let users = require('../config/user_message').users;

const dbUrl = 'mongodb://localhost:27017/';

let url = dbUrl + 'user';

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let dbo = db.db("user");
    let myobj =  users
    // batchwrite
    dbo.collection("user").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Count of new users: " + res.insertedCount);
        db.close();
    });
});
