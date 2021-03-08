//var Alpaca = require('@alpacahq/alpaca-trade-api');
import Alpaca from '@alpacahq/alpaca-trade-api';
const API_KEY = process.env.ALPACA_API_KEY;
const API_SECRET = process.env.ALPACA_API_SECRET;
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
        for (var i = 500; i < 504; i++) {
            data.push(result[i].symbol);
        }
        //console.log(data);
        alpaca.getBars('1D', data, { limit: 1000, start: '2018-01-01T00:00:00-04:00', end: '2021-03-06T00:00:00-04:00' }).then((response) => {
            var dummy = [];
            for (var sym in data) {
                //var dummy = [];
                for (var bar in response[data[sym]]) {
                    var obj = {};
                    dummy.push({ symbol: data[sym], date: response[data[sym]][bar].startEpochTime, open: response[data[sym]][bar].openPrice, high: response[data[sym]][bar].highPrice, low: response[data[sym]][bar].lowPrice, close: response[data[sym]][bar].closePrice, volume: response[data[sym]][bar].volume });
                    //console.log(obj)
                }
                /*
                try {
                    var res = await dbo.collection("prices").findOne({ symbol: data[sym] });
                    var finalData = res.data;
                    console.log(finalData);
                    var arr3 = [...finalData, ...dummy];
                    const update = {
                        "$set": {
                            "symbol": data[sym],
                            "data": arr3
                        }
                    };
                    var finalRes = await dbo.collection("prices").updateOne({ symbol: data[sym] }, update);
                    console.log(finalRes);
                } catch (error) {
                    console.log(error);
                }
                */
                /*
                dbo.collection("prices").findOne({ symbol: data[sym] })
                    .then((result) => {
                        var finalData = result.data;
                        var arr3 = [...finalData, ...dummy];
                        const update = {
                            "$set": {
                                "symbol": data[sym],
                                "data": arr3
                            }
                        };
                        dbo.collection("prices").updateOne({ symbol: data[sym] }, update)
                            .then((res) => console.log(res))
                            .catch((err) => console.log(err));
                    })
                    .catch(err => console.log(err));*/
            }
            dbo.collection("prices").insertMany(dummy, function (err, res) {
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