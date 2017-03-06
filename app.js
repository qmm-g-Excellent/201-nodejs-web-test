const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const router = require('./router');
const bodyParser = require("body-parser");

mongoose.connect(config.get('mongoUri'), (err) =>{
   if(err){
   console.log("mongodb connect error");
   } 
});

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.send({
        'hello': 'world'
    })
});

router(app);

app.listen(config.get('httpPort'), ()=> {
    console.log('server started at http://localhost:' + config.get('httpPort'));   // eslint-disable-line no-console
});

module.exports = app;