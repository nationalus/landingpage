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
    logger = config.logger;

var app = express();

//Database connection
mongoose.connect(config.dbURI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

var forceSSL = function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
};

if (process.env.NODE_ENV === 'production') {
    app.use(forceSSL);
}
app.use(function(req, res, next) {
    res.redirect('https://google.com');
});

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
        res.json({
            message : err.message
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message : err.message
    });
});


module.exports = app;
