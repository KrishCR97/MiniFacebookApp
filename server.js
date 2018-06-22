var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect("mongodb://localhost:27017/app");
var db = mongoose.connection;

db.on('open',function(){
    console.log("Connected to mongoDB");
});

db.on('error',function(){
console.log("Error in connected to mongoDB")
});

var user_schema = mongoose.Schema({
    userName : String,
    password : String,
    firstName : String,
    lastName : String,
    email : String,
    phoneNum : Number,
    location : String
});

var user_model =  mongoose.model('users', user_schema);

app.listen(3000,()=>{
console.log("Server running @ 3000")
});

app.get('/',(req,res)=>{

    var userDoc = {
        userName : "String",
        password : "String",
        firstName : "String",
        lastName : "String",
        email : "String",
        phoneNum : 123,
        location : "String"
    }
    userDoc = user_model(userDoc);
    userDoc.save((err)=>{
        if(!err){
            console.log("Document saved");
        }
    });
    res.send({
        firstName : "Kishon"
    });
});

app.get('/checkLogin/:userDetails',(req,res)=>{
    req.params.userDetails
    res.send(JSON.parse(req.params.userDetails));
    });

