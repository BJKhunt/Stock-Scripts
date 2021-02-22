import axios from 'axios';

import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;

async function hello() {
    var db = await MongoClient.connect("mongodb://localhost:27017/");
    var dbo = db.db("stocksinfo");
    dbo.collection("sp500").find().sort({ "_id": 1 }).toArray(function (err, result) {
        if (err) throw err;
        var data = [];
        for (var i = 0; i < 5; i++) {
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
        }, 2000);
    });
}
hello();
