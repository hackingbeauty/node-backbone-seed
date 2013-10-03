
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path'),
	app = express(),
	port = '3800', //process.env.PORT for production - use 'process.env.PORT || "3800"'
	io = require('socket.io').listen(app.listen(port)),
	nodeMailer = require('nodemailer'),
	mongoose = require('mongoose'),
	config = {
		mail: require('./config/mail')
	};

// All environments
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router); // this line must come AFTER cookieParser and session (above 2 lines)

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// Development environment
app.configure('development',function(){
	console.log("hello inside development environment");
	app.locals.pretty = true;
})

// Production environment
app.configure('production',function(){

});

// Models
require('./models/account')(config, mongoose, nodeMailer);

// Routes
require('./routes/authentication')(app);

app.get('/', function(req, res){
	res.render('index', { title: 'Express' });
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
