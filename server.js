// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
var publicFolder = __dirname + '/public';

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//routes that do not require tokens
require('./app/noauthRoutes.js')(app,User,publicFolder)
// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

//authenticate with token
require("./app/authenticate.js")(apiRoutes,jwt,app)
//routes that require token authentication
require('./app/routes.js')(apiRoutes)
//adding prefix of api to all fo these routes
app.use('/api', apiRoutes);
// ===============================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
