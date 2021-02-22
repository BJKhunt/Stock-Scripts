import axios from 'axios';
import { promisify } from 'util';

import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;
/*
async function hello() {
    var db = await MongoClient.connect("mongodb://localhost:27017/");
    var dbo = db.db("stocksinfo");
    dbo.collection("sp500").find().sort({ "_id": 1 }).toArray(function (err, result) {
        if (err) throw err;
        for (var k = 0; k < 200; k += 5) {
            var data = [];
            for (var i = k; i < k + 5; i++) {
                axios.get('https://api.polygon.io/v1/meta/symbols/' + result[i].symbol + '/company?&apiKey='+process.env.POLYGON_API_KEY)
                    .then(response => {
                        data.push(response.data);
                    })
                    .catch((err) => console.log(err))
            }
            setTimeout(function () {
                console.log(data);
                dbo.collection("fundastock").insertMany(data, function (err, res) {
                    if (err) throw err;
                    console.log(res);
                })
            }, 63000);
        }
    });
}
hello();
*/

async function dummy() {
    var db = await MongoClient.connect("mongodb://localhost:27017/");
    var dbo = db.db("stocksinfo");
    dbo.collection("sp500").find().sort({ "_id": 1 }).toArray(function (err, result) {
        if (err) throw err;
        var k = 500;
        var id = setInterval(function (result) {
            if (k > 504) {
                clearInterval(id);
            }
            else {
                var data = [];
                for (var i = k; i < k + 4; i++) {
                    axios.get('https://api.polygon.io/v1/meta/symbols/' + result[i].symbol + '/company?&apiKey=' + process.env.POLYGON_API_KEY)
                        .then(response => {
                            data.push(response.data);
                        })
                        .catch((err) => console.log(err))
                }
                setTimeout(function () {
                    console.log(data);
                    dbo.collection("fundastock").insertMany(data, function (err, res) {
                        if (err) throw err;
                        console.log(res);
                    })
                }, 8000);
                k += 5;
                console.log(k);
                for (var j = 0; j < 100000000; j++) { }
            }
        }, 69000, result)
    })
}
dummy();