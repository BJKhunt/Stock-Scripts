//var Alpaca = require('@alpacahq/alpaca-trade-api');
import Alpaca from '@alpacahq/alpaca-trade-api';
const API_KEY = 'PK3FXI9WQ3EZ3F70F0C1';
const API_SECRET = 'oKItsTlpvrE75tNhQI1mqXulcpGj68FceNqwc435';
const USE_POLYGON = false;
import axios from 'axios';
import { AlpacaClient, AlpacaStream } from '@master-chief/alpaca'

const alpaca = new Alpaca({
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
    usePolygon: USE_POLYGON
});

const client = new AlpacaClient({
    credentials: {
        key: API_KEY,
        secret: API_SECRET,
        // access_token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        paper: true,
    },
    rate_limit: true,
})


import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;

async function hello() {
    var db = await MongoClient.connect("mongodb://localhost:27017/");
    var dbo = db.db("stocksinfo");
    dbo.collection("sp500").find().sort({ "_id": 1 }).toArray(function (err, result) {
        //console.log(result);
        var data = [];
        for (var i = 400; i < 504; i++) {
            data.push(result[i].symbol);
        }
        //console.log(data);
        alpaca.getBars('1D', data, { limit: 1000, start: '2018-01-01T00:00:00-04:00', end: '2020-12-31T00:00:00-04:00' }).then((response) => {
            //console.log(new Date(response['AAPL'][99].startEpochTime * 1000))
            var mainData = [];
            for (var sym in data) {
                var dummy = [];
                for (var bar in response[data[sym]]) {
                    var obj = { date: new Date(response[data[sym]][bar].startEpochTime * 1000), open: response[data[sym]][bar].openPrice, high: response[data[sym]][bar].highPrice, low: response[data[sym]][bar].lowPrice, close: response[data[sym]][bar].closePrice, volume: response[data[sym]][bar].volume };
                    dummy.push(obj);
                    //console.log(obj)
                }
                mainData.push({ symbol: data[sym], data: dummy });
            }
            dbo.collection("prices").insertMany(mainData, function (err, res) {
                if (err) throw err;
                console.log(res);
            })
        }).catch(err => console.log(err))
    });
}
hello();


/*
async function hello() {
    var res = await client.getClock();
    console.log(res);
}
hello()
*/