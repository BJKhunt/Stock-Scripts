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
const client = new AlpacaClient({
    credentials: {
        key: API_KEY,
        secret: API_SECRET,
        // access_token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        paper: true,
    },
    rate_limit: true,
})

const stream = new AlpacaStream({
    credentials: {
        key: API_KEY,
        secret: API_SECRET,
        paper: true,
    },
    type: 'market_data', // or "account"
    source: 'iex', // or "sip" depending on your subscription
})*/
/*
stream.once('authenticated', () =>
    stream.subscribe('bars', ['SPY', 'AAPL', 'TSLA']),
)

stream.on('message', (message) => console.log(message))
stream.on('bar', (bar) => console.log(bar))
stream.on('error', (error) => console.warn(error))
*/

const data_client = alpaca.data_ws
data_client.onConnect(function () {
    console.log("Connected")
    const keys = USE_POLYGON ? ['T.FB', 'Q.AAPL', 'A.FB', 'AM.AAPL'] :
        ['alpacadatav1/T.FB', 'alpacadatav1/Q.AAPL', 'alpacadatav1/AM.AAPL', 'alpacadatav1/AM.FB']
    data_client.subscribe(keys);
})
data_client.onDisconnect(() => {
    console.log("Disconnected")
})
data_client.onStateChange(newState => {
    console.log(`State changed to ${newState}`)
})
data_client.onStockTrades(function (subject, data) {
    console.log(`Stock trades: ${subject}, price: ${data.price}`)
})
data_client.onStockQuotes(function (subject, data) {
    console.log(`Stock quotes: ${subject}, bid: ${data.bidprice}, ask: ${data.askprice}`)
})
data_client.onStockAggSec(function (subject, data) {
    console.log(`Stock agg sec: ${subject}, ${data}`)
})
data_client.onStockAggMin(function (subject, data) {
    console.log(`Stock agg min: ${subject}, ${data}`)
})
data_client.connect()