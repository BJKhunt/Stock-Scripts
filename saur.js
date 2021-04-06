import csvtojson from 'csvtojson';

import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;

//var MongoClient = require('mongodb').MongoClient;

var dbo;
MongoClient.connect(`mongodb+srv://admin:wld564R4n3cbmWdC@cluster0.xmguo.mongodb.net/EmailSystem?retryWrites=true&w=majority`, function (err, db) {
    if (err) throw err;
    dbo = db.db("csvs");

    csvtojson()
        .fromFile('simple.csv')
        .then((json) => {

            //const data= JSON.stringify(json);
            console.log(json)
            dbo.collection("csv").insertOne({ csvobject: json }, function (error, res) {
                if (error) throw error;
                console.log(res);
                db.close();
            });
        })

});
