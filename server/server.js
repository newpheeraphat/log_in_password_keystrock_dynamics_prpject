const express = require('express');
const Quotes = require('inspirational-quotes');
const app = express();
// const cors = require("cors");
// app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origins, X-Requested-With, Content-Type, Accept');
    next();
})

app.get('/', (req, res) => {
    res.send(Quotes.getQuote());
});

app.listen(4000, () => {
    console.log("Sever started on port 4000");
})