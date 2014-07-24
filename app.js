var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Mongo Congiguration
mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

// Todo Model
var Todo = mongoose.model('Todo', {
    text:String
});

// Get all todos
app.get('/api/todos', function(req, res) {
    // Use mongoose to get all todos in the database
    Todo.find(function(err, todos) {
        // If there is an error in retrieving, then handle it.
        if(err) {
            res.send(err);
        }
        // Pass data to frontend in json
        res.json(todos);
    });
});

// Create todos and send back all todos after creation
app.post('/api/todos', function(req, res) {
    // Create a todo, information comes from AJAX call from angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todos) {
        if (err)
            res.send(err);

        // get and return all todos after you created
        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});

// Delete specific todo
app.delete('/api/todos/:todos_id', function(req, res) {
    Todo.remove({
        _id : req.params.todos_id
    }, function(err, todo) {
        if(err) {
            res.send(err);
        }
        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});

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
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
