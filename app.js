var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    validator = require('express-validator'),
    mongoose = require('mongoose'),
    config = require('./config')(),
    compression = require('compression'),
    enforce = require('express-sslify'),
    minify = require('express-minify'),
    fs = require('fs'),
    logger = config.logger;

var app = express();

//Database connection
mongoose.connect(config.dbURI);

//Middleware
if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS(true));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, config.root), {
    setHeaders : function(res) {
        res.set({
            'Content-Encoding' : config.encoding
        })
    }
}));

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        logger.error(err);
        res.status(err.status || 500);
        fs.readFile(__dirname + '/public/error.html', function(err, data) {
            if (err) {
                return res.send('Error: Page not found');
            }
            res.send(data.toString());
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    fs.readFile(__dirname + '/public/error.html', function(err, data) {
        if (err) {
            return res.send('Error: Page not found');
        }
        res.send(data.toString());
    });
});


module.exports = app;
