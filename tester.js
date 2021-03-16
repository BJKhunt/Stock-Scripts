import Alpaca from '@alpacahq/alpaca-trade-api';
const API_KEY = process.env.ALPACA_API_KEY;
const API_SECRET = process.env.ALPACA_API_SECRET;
const USE_POLYGON = false;
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
    type: 'market_data',
    source: 'iex',
})

stream.once('authenticated', () =>
    stream.subscribe('bars', ['SPY', 'AAPL', 'TSLA']),
)

stream.on('message', (message) => console.log(message))
stream.on('bar', (bar) => console.log(bar))
stream.on('error', (error) => console.warn(error))
*/
/*
const data_client = alpaca.data_ws;
data_client.onConnect(function () {
    console.log(new Date(Date.now()) + "Connected")
    const keys = ['alpacadatav1/T.FB', 'alpacadatav1/Q.AAPL', 'alpacadatav1/AM.AAPL', 'alpacadatav1/AM.FB']
    data_client.subscribe(keys);
})
data_client.onDisconnect(() => {
    console.log(new Date(Date.now()) + "Disconnected")
})
data_client.onStateChange(newState => {
    console.log(new Date(Date.now()) + `State changed to ${newState}`)
})
data_client.onStockTrades(function (subject, data) {
    console.log(new Date(Date.now()) + `Stock trades: ${subject}, price: ${data.price}`)
})
data_client.onStockQuotes(function (subject, data) {
    console.log(new Date(Date.now()) + `Stock quotes: ${subject}, bid: ${data.bidprice}, ask: ${data.askprice}`)
})
data_client.onStockAggSec(function (subject, data) {
    console.log(new Date(Date.now()) + `Stock agg sec: ${subject}, ${data}`)
})
var chunk = [];
data_client.onStockAggMin(function (subject, data) {
    console.log(new Date(Date.now()) + `Stock agg min: ${subject}, ${data}`)
    chunk.push(data);
    if (chunk.length == 2)
        hello();

})
function hello() {
    console.log(chunk);
    chunk = [];
}
data_client.connect();
*/

/*
var todayDate = new Date().toISOString().slice(0, 10);
console.log(todayDate);
todayDate = "2021-03-05";
alpaca.getBars('1D', ['AAPL'], { limit: 1000, start: `${todayDate}T12:00:00-04:00`, end: `${todayDate}T22:00:00-04:00` })
    .then(response => {
        console.log(response);
        for (var i in response.AAPL) {
            console.log(new Date(response.AAPL[i].startEpochTime * 1000));
        }
    })
    .catch(err => console.log(err));

*/
alpaca.getClock()
    .then(res => {
        console.log(res);
        /*var finall = res.timestamp;
        var x = finall[15] - 1;
        console.log(x);
        x = -1;
        var final;
        if (x == -1)
            final = finall.substring(0, 15) + '9' + finall.substring(16);
        else
            final = finall.substring(0, 15) + x + finall.substring(16);
        var ctime = final.slice(0, 19);
        console.log(ctime);*/
    })
    .catch(err => console.log(err));