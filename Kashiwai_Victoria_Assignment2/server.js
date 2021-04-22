/* 
Victoria Kashiwai's Assignment 2 Server 
*/

//copied from "Getting Started with Assignment 2"
//also referenced Alyssa Mencel (F20) Assignment 2
var data = require('./static/product_data.js');
var express = require('express'); //load express 
var app = express(); //set express module to variable 'app'
var myParser = require("body-parser"); //load body-parser module
app.use(myParser.urlencoded({ extended: true })); //load data in body
var qs = require('qs'); //load file
var fs = require('fs'); //to read file

//var user_data = require('./user_data.json');
//read user database (borrowed from Lab 14)
var user_data_file = './user_data.json';
if(fs.existsSync(user_data_file)){
    var file_stats = fs.statSync(user_data_file);
    //console.log(file_stats ["size"]);
    var user_data = JSON.parse(fs.readFileSync('./user_data.json','utf8'));
} else {
    console.log(`${user_data_file} does not exist!`)
}


//copied from Lab 13 Ex3
app.all('*', function (req, res, next) {
    console.log(req.method, req.path);
    next();
});

//processes the login form 
//reference: "Getting Started with Assignment 2"
app.post('/static/process_login', function (request, response, next) {
    //Check that login and password match database
    console.log(request.body);
    let username_entered = request.body["uname"];
    let password_entered = request.body["psw"];
    if(typeof user_data[username_entered] != 'undefined'){
        if(user_data[username_entered]['password'] == password_entered) {
            //response.send(`${username_entered} is logged in!`);
            request.query["username"] = request.body["username"];
            response.redirect('invoice.html?'+ qs.stringify(request.query));
        } else {
            response.send(`Incorrect password for ${username_entered}`);
        }
    } else {
        response.send(`Account for ${username_entered} does not exist!`);
    }
    //it's gucci, send to invoice
    request.query["purchased"] = "true";
    //request.query["username"] = request.body["username"];
    //response.redirect('invoice.html?'+ qs.stringify(request.query));
});

//processes the registration form 
//reference: "Getting Started with Assignment 2"
app.post('/static/process_registration', function (request, response, next) {
    response.send(request.body);
});



app.use(express.static('.'));
app.listen(8080, () => console.log(`listening on port 8080`));