'use strict'

let MongoClient = require('mongodb').MongoClient;


let DBName = ['user', 'user_test'];
let tables = {
    user: ['user', 'user_record'],
    user_record: ['user_record']
}


const dbUrl = 'mongodb://localhost:27017/';

for (let [key, value] of Object.entries(tables)) {
    console.log(key,value)
    let url = dbUrl + key;

    MongoClient.connect(url, async (err, db) => {
        if(err) {
            throw err;
        }else {
            // console.log(`[DB] => [${key}] has been created!`);
            let dbo = db.db(key);
            let collections = value;
            for(let collection of collections) {
                await dbo.createCollection(collection, (err, res) => {
                    if(err){
                        throw err;
                    }else {
                        console.log(`[collection] => [${collection}] created!`);
                    }
                });
            }
        }
        // db.close();
    })
}



