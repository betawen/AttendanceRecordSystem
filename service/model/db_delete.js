'use strict'

let MongoClient = require('mongodb').MongoClient;


let DBName = ['user', 'user_test'];

const dbUrl = 'mongodb://localhost:27017/';

for (let name of DBName) {
    MongoClient.connect(dbUrl + name, async (err, db) => {
        if (err) {
            throw err;
        } else {
            await db.db(name).dropDatabase();
        }
        console.log('DB delete!')
        db.close()
    })
}
