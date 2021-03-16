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

async function helloo() {
    var db = await MongoClient.connect("mongodb://localhost:27017/");
    var dbo = db.db("stocksinfo");
    dbo.collection("sp500").find().sort({ "_id": 1 }).toArray(function (err, result) {
        //console.log(result);
        var data = [];
        for (var i = 0; i < 504; i++) {
            data.push(result[i].symbol);
        }
        //console.log(data);
        alpaca.getAssets({ status: 'active' })
            .then((response) => {
                //console.log(response);
                var complete = [], incomplete = [], count = 0;
                for (var i in data) {
                    var flag = 0;
                    for (var j in response) {
                        if (response[j].symbol == data[i] && response[j].status == 'active' && response[j].tradable) {
                            flag = 1;
                            var temp = data[i];
                            complete.push(temp);
                            count++;
                        }
                    }
                    if (!flag) {
                        incomplete.push(data[i]);
                    }
                }
                //console.log(complete);
                //console.log(count);
                var final = [];
                for (var k = 0; k < 200; k++) {
                    final.push(complete[k]);
                }
                var todayDate = new Date().toISOString().slice(0, 10);
                alpaca.getBars('1Min', final, { limit: 1000, start: `${todayDate}T09:30:00-04:00`, end: `${todayDate}T16:00:00-04:00` })
                    .then((response) => {
                        var dummy = [];
                        for (var j in final) {
                            var len = response[final[j]].length;
                            dummy.push(response[final[j]][len - 1]);
                        }
                        dbo.collection("todayprices").insertMany(dummy, function (err, res) {
                            if (err) throw err;
                            //console.log(res);
                        })
                    })
                    .catch(err => console.log(err));

                var final1 = [];
                for (var k = 200; k < 400; k++) {
                    final1.push(complete[k]);
                }
                var todayDate = new Date().toISOString().slice(0, 10);
                alpaca.getBars('1Min', final1, { limit: 1000, start: `${todayDate}T09:30:00-04:00`, end: `${todayDate}T16:00:00-04:00` })
                    .then((response) => {
                        var dummy = [];
                        for (var j in final1) {
                            var len = response[final1[j]].length;
                            dummy.push(response[final1[j]][len - 1]);
                        }
                        dbo.collection("todayprices").insertMany(dummy, function (err, res) {
                            if (err) throw err;
                            //console.log(res);
                        })
                    })
                    .catch(err => console.log(err));

                var final2 = [];
                for (var k = 400; k < count; k++) {
                    final2.push(complete[k]);
                }
                var todayDate = new Date().toISOString().slice(0, 10);
                alpaca.getBars('1Min', final2, { limit: 1000, start: `${todayDate}T09:30:00-04:00`, end: `${todayDate}T16:00:00-04:00` })
                    .then((response) => {
                        var dummy = [];
                        for (var j in final2) {
                            var len = response[final2[j]].length;
                            dummy.push(response[final2[j]][len - 1]);
                        }
                        dbo.collection("todayprices").insertMany(dummy, function (err, res) {
                            if (err) throw err;
                            //console.log(res);
                        })
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });
}
helloo();