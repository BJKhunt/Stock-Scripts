/* const express = require('express');
const axios = require('axios');
const cors = require('cors'); */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


var MongoClient = require('mongodb').MongoClient;
var dbo;
MongoClient.connect("mongodb://localhost:27017/", function (err, db) {
    if (err) throw err;
    dbo = db.db("stockinfo");

    for (var i = 1; i < 9323; i++) {
        dbo.collection("stock").find({ _id: i }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            console.log(result[0].symbol);
            axios.get('https://api.polygon.io/v1/meta/symbols/' + result[0].symbol + '/company?&apiKey=' + process.env.POLYGON_API_KEY)
                .then(response => {
                    var myquery = { _id: i };
                    var newvalues = { $set: { description: response.data.description } };
                    dbo.collection("stock").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("1 document updated");
                        db.close();
                    });
                    console.log(response);
                })
                .catch((err) => console.log(err))
        });
    }

    app.get('/', (req, res) => {
        axios.get('https://api.polygon.io/v1/meta/symbols/SINA/company?&apiKey=' + process.env.POLYGON_API_KEY)
            .then(response => {

                console.log(response);
                return res.status(200).json(response.data);
            })
            .catch((err) => console.log(err))
    });

});



const port = process.env.PORT || 5000;
app.listen(port, err => {
    if (err) return console.log(err);
    console.log('server running on port ' + port);
})