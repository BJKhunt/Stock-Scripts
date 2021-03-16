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
/*
alpaca.getBars('1D', ['AAPL'], { limit: 1000, start: '2021-03-08T09:31:00-05:00', end: '2021-03-08T16:00:00-05:00' })
    .then((response) => {
        console.log(response);
        for (var i in response.AAPL) {
            console.log(new Date(response.AAPL[i].startEpochTime * 1000));
        }
    })
    .catch(err => console.log(err));

console.log(new Date(Date.now()));

alpaca.getClock()
    .then(response => console.log(response))
    .catch(err => console.log(err));
*/
import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;

const CONNECTION_URL = process.env.DATABASE_URL;

export const runEveryday = async () => {
    //console.log(new Date(Date.now()));
    var todayDate = new Date().toISOString().slice(0, 10);
    var db = await MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    var dbo = db.db("stockdb");
    dbo.collection("stocks").find().sort({ symbol: 1 }).toArray(function (err, result) {
        console.log(result);
    })
}

runEveryday();