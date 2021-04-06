import fs from 'fs';

fs.readFile('prices.json', function (err, data) {
    if (err) console.log(err);
    var iam = JSON.parse(data);
    var final = [];
    for (var i = 0; i < iam.length; i++) {
        final.push({ Open: iam[i].open, High: iam[i].high, Low: iam[i].low, Close: iam[i].close, Volume: iam[i].volume, Symbol: iam[i].symbol, Date: iam[i].date });
    }
    var finall = JSON.stringify(final);
    //console.log(final);
    fs.writeFile('stockprices.json', finall, function (err, data) {
        if (err) console.log(err);
        console.log("complete");
    })
})
