const express = require('express');
const app = express();
const Quotes = require('inspirational-quotes');
const mongoose = require('mongoose');

const cors = require("cors");

app.use(express.json());
app.use(cors());


// connect to the cluster
// TODO: 

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