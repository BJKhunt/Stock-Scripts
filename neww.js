import Alpaca from '@alpacahq/alpaca-trade-api';
import WebSocket from 'ws';
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

function hello() {
    var ws = new WebSocket('wss://data.alpaca.markets/stream');
    var dummy = {
        "action": "authenticate",
        "data": {
            "key_id": API_KEY,
            "secret_key": API_SECRET
        }
    };
    ws.on('connection', function open() {
        ws.send(dummy);
    });

    ws.on('message', function incoming(data) {
        console.log(data);
    });
}
hello();