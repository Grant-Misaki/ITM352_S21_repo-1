var express = require('express');
var app = express();
var myParser = require("body-parser");
app.use(myParser.urlencoded({ extended: true }));

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with query' + JSON.stringify(request.query));
    next();
});

app.get('/test.html', function (request, response, next) {
    response.send('I got a request for /test');
});

app.post('/process_login', function (request, response, next) {
    //user_data = {'username': 'itm352', 'password': 'grader'};
    post_data = request.body;
    if (post_data['quantity_textbox']){
        the_qty = post_data ['quantity_textbox'];
        if(isNonNegInt(the_qty)) {
            response.send(`Thanks for purchasing ${the_qty} items`);
            return;
        } else {
            response.redirect('./login_page.html?quantity_textbox='+the_qty);
            return;
        }
    }
    response.send(post_data);
});

app.use(express.static('./public'));

app.listen(8080, function () {
    console.log(`listening on port 8080`)
}
); // note the use of an anonymous function here

function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}