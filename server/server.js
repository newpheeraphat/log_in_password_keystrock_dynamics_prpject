const express = require('express');
const app = express();
const mongoose = require('mongoose');
const iService = require("./iservice");

const cors = require("cors");

app.use(express.json());
app.use(cors());


// connect to the cluster
// TODO: 
mongoose.connect(
    'mongodb+srv://u6388100:new024124712@cluster0.cwegg78.mongodb.net/?retryWrites=true&w=majority'
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origins, X-Requested-With, Content-Type, Accept');
    next();
});

app.listen(4000, () => {
    console.log("Server started on port 4000");
})

app.post("/register", register)
app.post("/login", login)

async function login(req, res) {
    console.log("Looking for the username...");
    const user = await iService.getByUsername(req.body)
    if (user == null) return res.status(400).json({message: "Invalid Username and Password!"})

    if ((user.userbiokey + user.Threshold > req.body.userbiokey) && (user.userbiokey - user.Threshold < req.body.userbiokey)) {
        // console.log(Math.ceil(user.userbiokey - user.Threshold).toString() + " < " + req.body.userbiokey);
        // console.log(Math.ceil(user.userbiokey + user.Threshold).toString() + " > " + req.body.userbiokey);
        return res.json(user)
    } else {
        // console.log(user.userbiokey.toString() - user.Threshold.toString() + " < " + req.body.userbiokey);
        // console.log((user.userbiokey + user.Threshold).toString() + " > " + req.body.userbiokey);
        return res.status(400).json({message: "Error: Sorry, but please try to type your password again"});
    }
}

function register(req, res, next) {
    console.log("Creating the user information...");
    iService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
