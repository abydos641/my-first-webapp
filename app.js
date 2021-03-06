var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');

var routes = require('./routes/index');
// var users = require('./routes/user');

var app = express();

var restful = require('node-restful');
var mongoose = restful.mongoose;


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));

/* This line means 'application, you know JSON', 
originally our code was before this declaration, 
and our order of operations broke the app's 
ability to read JSON */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// database connection string via mongoose
mongoose.connect('mongodb://admin:test123@ds039411.mongolab.com:39411/proj1');

app.use('/', routes);
// User Schema
var User = app.user = restful.model('user', mongoose.Schema({
    name: 'string',
    email: 'string'
}))
.methods(['get', 'post', 'put', 'delete'])
.after('get',function(req, res, next){
    console.log(">>>>>>>>> "+res.locals.bundle);
    next();
})
.after('post',function(req, res, next){
    //console.log(">>>>>>>>> "+res.locals.bundle);
    //console.log(util.inspect(req, {showHidden: false, depth: null}));
    console.log("req.body", req.body)
    next();
});
User.register(app, '/users');
// app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
