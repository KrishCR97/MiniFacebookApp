var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
mongoose.Promise = require('q').Promise;
const bodyParser = require('body-parser');


app.use(cors({
    origin: "http://127.0.0.1:5500"
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var user_schema = mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNum: Number,
    location: String
});

var messages_schema = mongoose.Schema({
    recipient: String,
    recipient_img: String,
    sender: String,
    sender_img: String,
    title: String,
    description: String,
    created_at: Date,
    important: Number
});


var user_model = mongoose.model('users', user_schema);
var message_model = mongoose.model('messages',messages_schema);

app.listen(3000, () => {
    mongoose.connect("mongodb://localhost:27017/app");
    var db = mongoose.connection;

    db.on('open', function () {
        console.log("Connected to mongoDB");
    });

    db.on('error', function () {
        console.log("Error in connected to mongoDB")
    });
    console.log("Server running @ 3000")
});



app.get('/', (req, res) => {

    var userDoc = {
        userName: "String",
        password: "String",
        firstName: "String",
        lastName: "String",
        email: "String",
        phoneNum: 123,
        location: "String"
    }
    userDoc = user_model(userDoc);
    userDoc.save((err) => {
        if (!err) {
            console.log("Document saved");
        }
    });
    res.send({
        firstName: "Kishon"
    });
});

app.get('/m',(req, res) => {

    var message = {
    recipient: "String",
    recipient_img: "String",
    sender: "String",
    sender_img: "String",
    title: "String",
    description: "String",
    created_at: new Date(),
    important: 1
    }
    messageDoc = message_model(message);
    messageDoc.save((err,doc) => {
        if (!err) {
            console.log("Document saved");
            console.log(doc);
        }
    });
    res.send({
        firstName: "Hello"
    });
});

app.post('/loginValidation', (req, res) => {
    user_model.find({ userName: req.userName, password: req.password }, (err, doc) => {
        if (doc.length == 0) {
            res.send({ validUser: false });
            console.log("HEhe");
        }
        else {
            res.send({ validUser: true });
        }
    });
});

app.post('/newUserRegistration', (req, res) => {
    var newUser = new user_model(req.body);
    newUser.save(function (err, user) {
        if (!err) {
            res.send({ saveNewUser: true });
        }
        else {
            res.send({ saveNewUser: false });
        }

    });

});

