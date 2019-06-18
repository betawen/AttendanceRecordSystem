'use strict'

let MongoClient = require('mongodb').MongoClient;

// let DBName = ['user', 'user_test'];
// let tables = {
//     user: ['user', 'user_record']
// }

// import users from '../config/user_message'

let users = require('../config/user_info').users;
let user_record = require('../config/user_record').user_record;
let user_mac = require('../config/user_mac').user_mac;

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

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let dbo = db.db("user");
    let myobj =  user_record
    // batchwrite
    dbo.collection("user_record").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Count of new users: " + res.insertedCount);
        db.close();
    });
});

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let dbo = db.db("user");
    let myObj =  [];
    for (let [key, value] of Object.entries(user_mac)) {
        let obj = {
            user_name: key,
            mac_id: value
        }
        myObj.push(obj);
    }
    //let myobj =  Object.entries(user_mac)
    // batchwrite
    dbo.collection("user").insertMany(myObj, function(err, res) {
        if (err) throw err;
        console.log("Count of new users: " + res.insertedCount);
        db.close();
    });
});

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let dbo = db.db("user");
    let myObj =  [];
    for (let [key, value] of Object.entries(user_mac)) {
        let obj = {
            user_name: key,
            mac_id: value
        }
        myObj.push(obj);
    }
    //let myobj =  Object.entries(user_mac)
    // batchwrite
    dbo.collection("user_mac").insertMany(myObj, function(err, res) {
        if (err) throw err;
        console.log("Count of new users mac: " + res.insertedCount);
        db.close();
    });
});
