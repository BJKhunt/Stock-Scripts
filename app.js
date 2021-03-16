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
import cron from 'node-cron';
import { runEveryday } from './scriptEveryday.js';

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

cron.schedule('3 17 * * Monday,Tuesday,Wednesday,Thursday,Friday', runEveryday, {
    scheduled: true,
    timezone: "America/New_York"
});

var MongoClient = require('mongodb').MongoClient;
var dbo;

MongoClient.connect("mongodb://localhost:27017/", function (err, db) {
    if (err) throw err;
    dbo = db.db("stockinfo");
});

const port = process.env.PORT || 5000;
app.listen(port, err => {
    if (err) return console.log(err);
    console.log('server running on port ' + port);
})