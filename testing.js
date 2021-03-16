import Alpaca from '@alpacahq/alpaca-trade-api';
const API_KEY = process.env.ALPACA_API_KEY;
const API_SECRET = process.env.ALPACA_API_SECRET;
const USE_POLYGON = false;
import { AlpacaClient, AlpacaStream } from '@master-chief/alpaca'
import { Client } from "alpaca-api";

const client = new Client({
    key: API_KEY,
    secret: API_SECRET,
    paper: true,
    rate_limit: true,
})

const stream = new Stream(client, market).connect();

stream.subscribe(['T.SPY']);

stream.on("message", trade => console.log(trade));