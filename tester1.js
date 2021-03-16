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
/*
const client = alpaca.data_ws
client.onConnect(function () {
    console.log("Connected")
    client.subscribe(['alpacadatav1/AM.AAPL', 'alpacadatav1/AM.ADBE', 'alpacadatav1/AM.MSFT', 'alpacadatav1/AM.FB']) // when using alpaca ws
    //client.subscribe(['alpacadatav1/T.FB', 'Q.AAPL', 'A.FB', 'AM.AAPL'])  // when using polygon ws
})
client.onDisconnect(() => {
    console.log("Disconnected")
})
client.onStateChange(newState => {
    console.log(`State changed to ${newState}`)
})
var chunk = [];
client.onStockAggMin(function (subject, data) {
    console.log(`Stock agg min: ${subject}, ${data}`)
    chunk.push(data);
    if (chunk.length == 4) {
        hello();
    }
})
function hello() {
    console.log(chunk);
    console.log(new Date(chunk[0].startEpochTime));
    console.log(new Date(chunk[0].endEpochTime));
    chunk = [];
}
client.connect()
*/

import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;

async function helloo() {
    var db = await MongoClient.connect("mongodb://localhost:27017/");
    var dbo = db.db("stockdb");
    dbo.collection("stocks").find().sort({ "_id": 1 }).toArray(function (err, result) {
        if (err)
            console.log(err);
        //console.log(result);
        var data = [];
        for (var i = 0; i < 494; i++) {
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
                            var temp = 'alpacadatav1/AM.' + data[i];
                            complete.push(temp);
                            count++;
                        }
                    }
                    if (!flag) {
                        incomplete.push(data[i]);
                    }
                }
                console.log(incomplete);
                console.log(count);

            })
            .catch(err => console.log(err));
    });
}
helloo();