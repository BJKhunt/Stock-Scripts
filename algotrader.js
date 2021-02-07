//const algotrader = require('algotrader');
import algotrader from 'algotrader';
const AlphaVantage = algotrader.Data.AlphaVantage;
const av = new AlphaVantage("WPOKHUZL01HXM0XY");

/*
av.sectorPerformance()
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) })
*/

/*
var res = ['MSFT', 'FB', 'AAPL', 'TSLA', 'MMM', 'ACN', 'AMD', 'AFL', 'FTNT', 'FOX', 'FCX', 'GPS']
for (var i = 0; i < 12; i++) {
    av.timeSeriesIntraday(res[i], "60min")
        .then((res) => { console.log(res) })
        .catch((err) => { console.log(err) })
}
*/

const iex = algotrader.Data.IEX;
/*
iex.getMarket()
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) })

*/

var res = ['MSFT', 'FB', 'AAPL', 'TSLA', 'MMM', 'ACN', 'AMD', 'AFL', 'FTNT', 'FOX', 'FCX', 'GPS']
for (var i = 0; i < 12; i++) {
    iex.getCompanyDetails(res[i])
        .then((res) => { console.log(res) })
        .catch((err) => { console.log(err) })
}