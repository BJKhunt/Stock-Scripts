import fs from 'fs';

fs.readFile('stockinfos.json', function (err, data) {
    if (err) console.log(err);
    var iam = JSON.parse(data);
    var final = [];
    for (var i = 0; i < iam.length; i++) {
        final.push({ Logo: iam[i].logo, Listdate: iam[i].listdate, Country: iam[i].country, Industry: iam[i].industry, Sector: iam[i].sector, Marketcap: iam[i].marketcap, Employees: iam[i].employees, Phone: iam[i].phone, Ceo: iam[i].ceo, Url: iam[i].url, Description: iam[i].description, Exchange: iam[i].exchange, Name: iam[i].name, Symbol: iam[i].symbol, Hq_address: iam[i].hq_address });
    }
    var finall = JSON.stringify(final);
    //console.log(final);
    fs.writeFile('fundastock.json', finall, function (err, data) {
        if (err) console.log(err);
        console.log("complete");
    })
})
