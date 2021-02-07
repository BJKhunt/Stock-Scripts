/* const express = require('express');
const axios = require('axios');
const cors = require('cors'); */
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


app.get('/', (req, res) => {
    axios.get('https://api.polygon.io/v1/meta/symbols/SINA/company?&apiKey=EdpUZIewOC_O88OL9yuLdkXuSfgdPst4')
        .then(response => {

            console.log(response);
            return res.status(200).json(response.data);
        })
        .catch((err) => console.log(err))
});


var MongoClient = require('mongodb').MongoClient;
var dbo;
MongoClient.connect("mongodb://localhost:27017/", function (err, db) {
    if (err) throw err;
    dbo = db.db("mydb");
    alpaca.getAssets({
        status: 'active',
        asset_class: 'us_equity'
    }).then((res) => {
        var data = [];
        for (var i in res) {
            var item = res[i];
            var obj;
            const ice = Math.random().toString(36).substring(2, 7);
            if (item.status == 'active' && item.tradable) {
                obj = { _id: ice, symbol: item.symbol, name: item.name, exchange: item.exchange }
            }
            data.push(obj);
            // var myobj = { name: "Company Inc", address: "Highway 37" };
            dbo.collection("stock").insertOne(obj, function (error, res) {
                if (error) throw error;
                // console.log("1 document inserted");
                db.close();
            });
        }
        //console.log(data);
    });

});



const port = process.env.PORT || 5000;
app.listen(port, err => {
    if (err) return console.log(err);
    console.log('server running on port ' + port);
})