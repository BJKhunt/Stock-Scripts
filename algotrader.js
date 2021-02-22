//const algotrader = require('algotrader');
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();
import algotrader from 'algotrader';
const AlphaVantage = algotrader.Data.AlphaVantage;
const av = new AlphaVantage(process.env.ALPHA_API_KEY);


av.sectorPerformance()
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) })

console.log(process.env);

/*
var res = ['MSFT', 'FB', 'AAPL', 'TSLA', 'MMM', 'ACN', 'AMD', 'AFL', 'FTNT', 'FOX', 'FCX', 'GPS']
for (var i = 0; i < 12; i++) {
    av.timeSeriesIntraday(res[i], "60min")
        .then((res) => { console.log(res) })
        .catch((err) => { console.log(err) })
}
*/
/*
const iex = algotrader.Data.IEX;

iex.getMarket()
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) })
*/

/*
var res = ['MSFT', 'FB', 'AAPL', 'TSLA', 'MMM', 'ACN', 'AMD', 'AFL', 'FTNT', 'FOX', 'FCX', 'GPS']
for (var i = 0; i < 12; i++) {
    iex.getCompanyDetails(res[i])
        .then((res) => { console.log(res) })
        .catch((err) => { console.log(err) })
}*/