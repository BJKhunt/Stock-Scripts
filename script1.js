var Alpaca = require('@alpacahq/alpaca-trade-api');
const API_KEY = process.env.ALPACA_API_KEY;
const API_SECRET = process.env.ALPACA_API_SECRET;
const USE_POLYGON = false;


this.alpaca = new Alpaca({
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
    usePolygon: USE_POLYGON
})

const client = this.alpaca.data_ws
client.onConnect(function () {
    console.log("Connected")
    client.subscribe(['alpacadatav1/T.FB', 'alpacadatav1/Q.AAPL', 'alpacadatav1/AM.AAPL']) // when using alpaca ws
})
client.onDisconnect(() => {
    console.log("Disconnected")
})
client.onStateChange(newState => {
    console.log(`State changed to ${newState}`)
})
client.onStockTrades(function (subject, data) {
    console.log(`Stock trades: ${subject}, price: ${data.price}`)
})
client.onStockQuotes(function (subject, data) {
    console.log(`Stock quotes: ${subject}, bid: ${data.bidprice}, ask: ${data.askprice}`)
})
client.onStockAggSec(function (subject, data) {
    console.log(`Stock agg sec: ${subject}, ${data}`)
})
client.onStockAggMin(function (subject, data) {
    console.log(`Stock agg min: ${subject}, ${data}`)
})
client.connect()


