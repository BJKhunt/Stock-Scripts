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
    var db = await MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    var dbo = db.db("stockdb");
    dbo.collection("stocks").find().sort({ symbol: 1 }).toArray(function (err, result) {
        var data = [];
        for (var i = 0; i < 200; i++) {
            data.push(result[i].symbol);
        }
        alpaca.getBars('1D', data, { limit: 1000, start: `${todayDate}T00:00:00-04:00`, end: `${todayDate}T22:03:00-04:00` })
            .then(response => {
                var dummy = [];
                for (var i in data) {
                    for (var bar in response[data[i]]) {
                        dummy.push({ symbol: data[i], date: response[data[i]][bar].startEpochTime, open: response[data[i]][bar].openPrice, high: response[data[i]][bar].highPrice, low: response[data[i]][bar].lowPrice, close: response[data[i]][bar].closePrice, volume: response[data[i]][bar].volume });
                    }
                }
                dbo.collection("prices").insertMany(dummy, function (err, res) {
                    if (err) throw err;
                    //console.log(res);
                })
            })
            .catch(err => console.log(err));

        var data1 = [];
        for (var i = 200; i < 400; i++) {
            data1.push(result[i].symbol);
        }
        alpaca.getBars('1D', data1, { limit: 1000, start: `${todayDate}T00:00:00-04:00`, end: `${todayDate}T22:03:00-04:00` })
            .then(response => {
                var dummy = [];
                for (var i in data1) {
                    for (var bar in response[data1[i]]) {
                        dummy.push({ symbol: data1[i], date: response[data1[i]][bar].startEpochTime, open: response[data1[i]][bar].openPrice, high: response[data1[i]][bar].highPrice, low: response[data1[i]][bar].lowPrice, close: response[data1[i]][bar].closePrice, volume: response[data1[i]][bar].volume });
                    }
                }
                dbo.collection("prices").insertMany(dummy, function (err, res) {
                    if (err) throw err;
                    //console.log(res);
                })
            })
            .catch(err => console.log(err));

        var data2 = [];
        for (var i = 400; i < 503; i++) {
            data2.push(result[i].symbol);
        }
        alpaca.getBars('1D', data2, { limit: 1000, start: `${todayDate}T00:00:00-04:00`, end: `${todayDate}T22:03:00-04:00` })
            .then(response => {
                var dummy = [];
                for (var i in data2) {
                    for (var bar in response[data2[i]]) {
                        dummy.push({ symbol: data2[i], date: response[data2[i]][bar].startEpochTime, open: response[data2[i]][bar].openPrice, high: response[data2[i]][bar].highPrice, low: response[data2[i]][bar].lowPrice, close: response[data2[i]][bar].closePrice, volume: response[data2[i]][bar].volume });
                    }
                }
                dbo.collection("prices").insertMany(dummy, function (err, res) {
                    if (err) throw err;
                    //console.log(res);
                })
            })
            .catch(err => console.log(err));
    })
}