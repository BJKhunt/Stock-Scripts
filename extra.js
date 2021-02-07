//var Alpaca = require('@alpacahq/alpaca-trade-api');
import Alpaca from '@alpacahq/alpaca-trade-api';
const API_KEY = 'PK3FXI9WQ3EZ3F70F0C1';
const API_SECRET = 'oKItsTlpvrE75tNhQI1mqXulcpGj68FceNqwc435';
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
    dbo = db.db("stockinfo");

    for (var i = 1; i < 2; i++) {
        dbo.collection("stock").find({ _id: i }).toArray
            .then((result) => {
                console.log(result);
                console.log(result[0].symbol);
                axios.get('https://api.polygon.io/v1/meta/symbols/' + result.symbol + '/company?&apiKey=EdpUZIewOC_O88OL9yuLdkXuSfgdPst4')
                    .then(response => {
                        var myquery = { _id: i };
                        var newvalues = { $set: { description: response.data.description } };
                        dbo.collection("stock").updateOne(myquery, newvalues, function (err, res) {
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