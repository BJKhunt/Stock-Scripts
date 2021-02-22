//var Alpaca = require('@alpacahq/alpaca-trade-api');
import Alpaca from '@alpacahq/alpaca-trade-api';
const API_KEY = process.env.ALPACA_API_KEY;
const API_SECRET = process.env.ALPACA_API_SECRET;
const USE_POLYGON = false;
import axios from 'axios';

const alpaca = new Alpaca({
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
    usePolygon: USE_POLYGON
});

import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;
//var MongoClient = require('mongodb').MongoClient;

/*
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
*/


var dbo;
MongoClient.connect("mongodb://localhost:27017/", function (err, db) {
    if (err) throw err;
    dbo = db.db("stocksinfo");

    for (var i = 3; i < 25; i++) {
        dbo.collection("stock").findOne({ _id: i }, { projection: { _id: 1, symbol: 1, name: 1 } })
            .then((result) => {
                console.log(result);
                console.log(result.symbol);
                axios.get('https://api.polygon.io/v1/meta/symbols/' + result.symbol + '/company?&apiKey=' + process.env.POLYGON_API_KEY)
                    .then(response => {
                        var myquery = { _id: result._id };
                        //console.log(i);
                        var newvalues = { $set: { description: response.data.description } };
                        var option = { upsert: true };
                        dbo.collection("stock").updateOne(myquery, newvalues, option, function (err, res) {
                            if (err) throw err;
                            console.log("1 document updated");
                            db.close();
                        });
                        //console.log(response);
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }
});