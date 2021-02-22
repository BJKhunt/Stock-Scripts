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

async function hello() {
    var db = await MongoClient.connect("mongodb://localhost:27017/");
    var dbo = db.db("stocksinfo");
    dbo.collection("sp500").find().sort({ "MMM": 1 }).toArray(function (err, result) {
        //console.log(result);
        var count = 1;
        var dataa = [];
        for (var i in result) {
            var obj = { _id: count, symbol: result[i].MMM, name: result[i]["3M Company"] };
            dataa.push(obj);
            count++;
        }
        //console.log(dataa);
        dbo.collection("sp").insertMany(dataa, function (err, res) {
            if (err) throw err;
            console.log(res.insertedCount);
        });
    });
}
hello();