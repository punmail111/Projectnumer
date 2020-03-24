var express = require('express');
var app = express();
var fs = require("fs"); //อ่านไฟล์ user.json
var cors = require('cors');
app.use(cors());
const mongoose = require('mongoose')
app.use(express.json())

//mongoose.connect('mongodb://localhost:27017/newmer');
mongoose.connect('mongodb+srv://punmail111:1234@cluster0-iszlb.azure.mongodb.net/Numer');
var Schema = mongoose.Schema;

var mySchemaxlxr = mongoose.Schema({
    key : String,
    fx : String,
    xl : Number,
    xr : Number,
});

var mySchemaexact = mongoose.Schema({
    key : String,
    fx : String,
    x0 : Number,
    x1 : Number,
    x2 : Number,
    n : Number,
});

var mySchemax0 = mongoose.Schema({
    key : String,
    fx : String,
    x0 : Number,
});

var mySchemax0x1 = mongoose.Schema({
    key : String,
    fx : String,
    x0 : Number,
    x1 : Number,
});

var myModelxlxr = mongoose.model('myModelxlxr', mySchemaxlxr, 'testting');
console.log('connect')

var myModelexact = mongoose.model('myModelexact', mySchemaexact, 'testting');
console.log('connect')

var myModelx0 = mongoose.model('myModelx0', mySchemax0, 'testting');
console.log('connect')

var myModelx0x1 = mongoose.model('myModelx0x1', mySchemax0x1, 'testting');
console.log('connect')


app.get('/bisection', function(req, res, next){
    myModelxlxr.find({key: 'bisection'}, function(err, docs){
        console.log(docs)
        res.json(docs)
    })
});

app.get('/falseposition', function(req, res, next){
    myModelxlxr.find({key: 'falseposition'}, function(err, docs){
        console.log(docs)
        res.json(docs)
    })
});

app.get('/newton', function(req, res, next){
    myModelx0.find({key: 'newton'}, function(err, docs){
        console.log(docs)
        res.json(docs)
    })
});

app.get('/onepoint', function(req, res, next){
    myModelx0.find({key: 'onepoint'}, function(err, docs){
        console.log(docs)
        res.json(docs)
    })
});

app.get('/secant', function(req, res, next){
    myModelx0x1.find({key: 'secant'}, function(err, docs){
        console.log(docs)
        res.json(docs)
    })
});

app.get('/exact', function(req, res, next){
    myModelxlxr.find({key: 'Exact'}, function(err, docs){
        console.log(docs)
        res.json(docs)
    })
});

    var server = app.listen(8080,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Application Run At http://%s:%s",host, port)
});
