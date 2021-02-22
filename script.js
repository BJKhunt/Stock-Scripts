//var Alpaca = require('@alpacahq/alpaca-trade-api');
import Alpaca from '@alpacahq/alpaca-trade-api';
const API_KEY = process.env.ALPACA_API_KEY;
const API_SECRET = process.env.ALPACA_API_SECRET;
const USE_POLYGON = false;

const alpaca = new Alpaca({
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
    usePolygon: USE_POLYGON
});

import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;
//var MongoClient = require('mongodb').MongoClient;
var dbo;
MongoClient.connect("mongodb://localhost:27017/", function (err, db) {
    if (err) throw err;
    dbo = db.db("stocksinfo");
    alpaca.getAssets({
        status: 'active',
        asset_class: 'us_equity'
    }).then((res) => {
        var data = [];
        var count = 1;
        for (var i in res) {
            var item = res[i];
            var obj;
            const ice = Math.random().toString(36).substring(2, 7);
            if (item.status == 'active' && item.tradable) {
                obj = { _id: count, symbol: item.symbol, name: item.name, exchange: item.exchange }
                count++;
            }
            data.push(obj);
            // var myobj = { name: "Company Inc", address: "Highway 37" };
            dbo.collection("stock").insertOne(obj, function (error, res) {
                if (error) throw error;
                // console.log("1 document inserted");
                db.close();
            });
        }
        //console.log(data);
    });

});



/*
MongoClient.connect("mongodb://localhost:27017/", function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("stock").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
*/