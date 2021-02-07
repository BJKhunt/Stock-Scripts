var Alpaca = require('@alpacahq/alpaca-trade-api');
const API_KEY = 'PK3FXI9WQ3EZ3F70F0C1';
const API_SECRET = 'oKItsTlpvrE75tNhQI1mqXulcpGj68FceNqwc435';
const USE_POLYGON = false;


this.alpaca = new Alpaca({
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
    usePolygon: USE_POLYGON
})

this.alpaca.getCalendar({ start: '2021-01-02T15:04:05Z', end: '2021-02-25T15:04:05Z' })
    .then((res) => console.log(res))