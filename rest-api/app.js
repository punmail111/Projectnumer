var express = require('express');
var app = express();
var fs = require("fs"); //อ่านไฟล์ user.json
var cors = require('cors');
app.use(cors());
const mongoose = require('mongoose')
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/newmer');
var Schema = mongoose.Schema;

var mySchemaxlxr = mongoose.Schema({
    key : String,
    fx : String,
    xl : Number,
    xr : Number,
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

var myModelxlxr = mongoose.model('myModelxlxr', mySchemaxlxr, 'Testting');
console.log('connect')

var myModelx0 = mongoose.model('myModelx0', mySchemax0, 'Testting');
console.log('connect')

var myModelx0x1 = mongoose.model('myModelx0x1', mySchemax0x1, 'Testting');
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
/*
//GET Method ดึงข้อมูลมาทั้งหมด
app.get('/getUsers', function(req, res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function(err, data){
        console.log(data); //data คือ ก้อนข้อมูลของ user ทุกคน
        res.end(data);
    });
});

//GET Method แบบมีเงื่อนไข id
app.get('/getUsers/:id', function(req,res){
    fs.readFile(__dirname + "/" + "user.json",'utf8', function(err, data){
        var users = JSON.parse(data); //แปลงข้อมูลให้เป็นก้อน
        var user = users["user" + req.params.id] //เพิ่มเงื่อนไข
        console.log(user);
        res.end(JSON.stringify(user));
    });
});

/*var user = {
    "user4" : {
        "name" : "kongruksiam",
        "password" : "5555",
        "progession" : "programer",
        "id" : 4
    }
}*/
/*
//ลบข้อมูล
app.delete('/delUser/:index', function(req,res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function(err,data){
        data = JSON.parse(data);
        delete data["user" + req.params.index];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.post('/addUser', function(req,res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function(err,data){
        data = JSON.parse(data);
        data["user4"] = user["user4"]; //เพิ่มข้อมูลใหม่มาจากตัวแปร user
        console.log(data);
        res.end(JSON.stringify(data));
    });
});
*/
var server = app.listen(4000,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Application Run At http://%s:%s",host, port)
});
